import { toast } from 'react-toastify';
import { useState } from "react";
import { API_FETCH_ACTIONS } from "../config/api_fetch_actions";

export const useFetchApi = (userIsAuth = false) => {

    const [useDataRecord, setDataRecord] = useState({
        isLoading: true,
        data: [],
        message: ""
    });

    const actionMethodConnect = (name_section = "", action = "GET", EXTRA = undefined, EXTRA2 = undefined, onResetForm = undefined) => {

        const API = API_FETCH_ACTIONS(action, name_section, EXTRA, EXTRA2, userIsAuth);

        if (API !== "undefined") {

            API?.then((result) => {

                if (result?.isTokenExpired) {
                    localStorage.removeItem("user_auth_token_logged");
                    window.location.replace("/");

                } else {

                    if (result?.ok) {
                        if (action === "GET") {
                            setDataRecord({
                                isLoading: false,
                                data: result.data,
                                message: result.message
                            });
                        }

                        if (action === "POST" || action === "PUT") {

                            if (name_section === "AUTH") {

                                if (EXTRA === "LOGIN") {
                                    localStorage.setItem("user_auth_token_logged", result.token_access);
                                    window.location.replace("/admin");

                                } else if (EXTRA === "REGISTER") {
                                    window.location.replace("/");
                                }


                            } else if (EXTRA === "CREATE" && name_section === "RESERVATIONS") {
                                toast.success(result.message, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                });

                                onResetForm();
                            }
                        }
                    } else {
                        if (action === "POST" || action === "PUT") {
                            toast.error(result.message, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                        }

                        setDataRecord({
                            isLoading: false,
                            data: [],
                            message: "Error del servidor"
                        });
                    }
                }

            }).catch((error) => {
                setDataRecord({
                    isLoading: false,
                    data: [],
                    message: error.message
                });
            });
        }
    }

    return {
        useDataRecord,
        setDataRecord,
        actionMethodConnect
    };
}

/*
    ARG EXTRA POSIBILITIES:
        EXTRA === "CREATE" --> {} <-- may you receive
        EXTRA === "UPDATE" --> "" or {} <-- may you receive
        EXTRA === "REMOVE" --> "" or {} <-- may you receive
        EXTRA === "QUERY" --> [] <-- may you receive
        EXTRA === "LOGIN"
        EXTRA === "REGISTER"

    ARG EXTRA2 POSIBILITIES:    
        Value Query entered
        Value data insert from form {}
        Value id to delete or update
*/
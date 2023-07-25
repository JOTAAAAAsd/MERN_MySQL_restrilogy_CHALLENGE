
import { useState } from "react";
import { useFetchApi } from "../useFetchApi";

export const useAuthForm = () => {

    const [useAuthLoginForm, setAuthLoginForm] = useState({
        username: "",
        password: "",
        fullname: "",
        repeat_password: ""
    });

    const { actionMethodConnect } = useFetchApi(false);


    const onChangeAuthLoginForm = (e) => {
        setAuthLoginForm({
            ...useAuthLoginForm,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitAuthLoginForm = (e, isRegister) => {

        e.preventDefault();

        const data_to_send_login = {
            username: useAuthLoginForm.username,
            password: useAuthLoginForm.password
        };

        const data_to_send_register = {
            ...useAuthLoginForm,
            fullname: useAuthLoginForm.fullname,
            repeat_password: useAuthLoginForm.repeat_password
        };

        if (isRegister === "LOGIN") {
            actionMethodConnect("AUTH", "POST", "LOGIN", data_to_send_login);

        } else if (isRegister === "REGISTER") {
            actionMethodConnect("AUTH", "POST", "REGISTER", data_to_send_register);

        }
    }

    return {
        useAuthLoginForm,
        onChangeAuthLoginForm,
        onSubmitAuthLoginForm,
    };
}
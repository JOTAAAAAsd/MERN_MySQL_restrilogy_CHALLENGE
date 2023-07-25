import jwt_decode from "jwt-decode";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const type_user = localStorage.getItem("user_auth_token_logged") || "";

    const [useInfoUser, setInfoUser] = useState({});

    useEffect(() => {
        if (type_user) {
            setInfoUser(jwt_decode(type_user));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return <AuthContext.Provider
        value={{
            useInfoUser
        }}
    >

        {children}

    </AuthContext.Provider>;
}



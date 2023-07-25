import { CONNECT_ENDPOINT } from "./routes_api";

export const API_FETCH_ACTIONS = (action = "GET", name_section, EXTRA, EXTRA2, userIsAuth) => {

    const token_user_auth = localStorage.getItem("user_auth_token_logged");

    let body_params = {
        method: action,
        headers: {
            "Content-Type": "application/json"
        }
    };

    body_params.headers.usuario_autorizacion = userIsAuth ? token_user_auth : "";

    if (action === "POST" || action === "PUT") {
        if (Object.keys(EXTRA2).length > 0) {
            body_params.body = JSON.stringify(EXTRA2);
        }
    }

    const ENDPOINT = CONNECT_ENDPOINT(action, name_section, EXTRA, EXTRA2);

    if (ENDPOINT) {
        return fetch(ENDPOINT, body_params).then((response) => {
            return response.json();
        }).then((result) => result).catch((error) => {
            console.log(error.message);
        });
    }
};

export const URI_API_BASE = (isDeploy = false) => {
    return isDeploy ? process.env.REACT_APP_BACKEND_URL_DEPLOY : process.env.REACT_APP_BACKEND_URL_LOCAL;
}

const BASE = URI_API_BASE();

export const ROUTES_API = {
    AUTH: [
        `${BASE}/auth/user-login`,
        `${BASE}/auth/user-register`
    ],

    RESERVATIONS: [
        `${BASE}/reservation/post`,
        `${BASE}/reservation/get`,
        `${BASE}/reservation/get-search?fullname=`,
        `${BASE}/reservation/get-reservations-userId/`,
    ]
};

export const CONNECT_ENDPOINT = (action, name_section, EXTRA, EXTRA2) => {

    let endpoint = "";

    switch (action) {

        case "POST":
            if (name_section === "AUTH") {

                if (EXTRA === "LOGIN") {
                    endpoint = ROUTES_API.AUTH[0];

                } else if (EXTRA === "REGISTER") {
                    endpoint = ROUTES_API.AUTH[1];

                }

            } else if (name_section === "RESERVATIONS") {

                if (EXTRA === "CREATE") {
                    endpoint = ROUTES_API.RESERVATIONS[0];

                }

            }

            break;

        case "GET":

            if (name_section === "AUTH") {

            } else if (name_section === "RESERVATIONS") {

                if (EXTRA === "GET_ALL") {
                    endpoint = ROUTES_API.RESERVATIONS[1];

                } else if (EXTRA === "QUERY") {
                    endpoint = ROUTES_API.RESERVATIONS[2] + EXTRA2;

                } else if (EXTRA === "GET_RESERVATIONS_BY_USER") {
                    endpoint = ROUTES_API.RESERVATIONS[3] + EXTRA2;

                }
            }
            break;

        case "PUT":
            break;

        case "DELETE":
            break;

        default:
            break;

    }

    return endpoint;

}

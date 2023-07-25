const QUERY_MYSQL = require("../../config/queryConfig");

const { getdate, getHour } = require("../../config/myFormatDate");
const { JWT_simpleVerifyExpirationTokenUser, JWT_simpleDecodeTokenUser } = require("../../config/jwtSimple");


const ReservationPostController = (req, res) => {

    const tokenHeaderAuth = req.headers.usuario_autorizacion;

    if (tokenHeaderAuth === "" || JWT_simpleVerifyExpirationTokenUser(tokenHeaderAuth)) {
        res.status(401).json({
            ok: false,
            message: "El usuario ha expirado",
            isTokenExpired: tokenHeaderAuth === "" ? false : true
        });

    } else {

        const user_id_auth = JWT_simpleDecodeTokenUser(tokenHeaderAuth).id;

        const { persons, type_contact, data_contact, reservation_time, reservation_date } = req.body;

        if (persons.trim() === "" || type_contact.trim() === "" || data_contact.trim() === ""
            || reservation_time.trim() === "" || reservation_date.trim() === "") {
            res.status(404).json({
                ok: false,
                message: "Todos los campos son requeridos"
            });

        } else {

            const created_at = `${getdate(new Date)} | ${getHour(new Date)}`;

            const table_per_person = parseInt(persons) / 4;
            const tables = String(Math.ceil(table_per_person));

            const RESULT = QUERY_MYSQL("INSERT_DATA_SIMPLE", "reservations", ["userId", "persons", "tables", "type_contact", "data_contact",
                "reservation_time", "reservation_date", "created_at"], [user_id_auth, persons, tables, type_contact, data_contact,
                reservation_time, reservation_date, created_at]);

            RESULT.then((data) => {

                if (data.code === "201") {

                    res.status(201).json({
                        ok: true,
                        message: "La reservación se ha agendado correctamente"
                    });

                } else if (data.code === "500") {
                    res.status(parseInt(data.code)).json(data);

                }

            });
        }
    }
}

const ReservationGetController = (req, res) => {

    const tokenHeaderAuth = req.headers.usuario_autorizacion;

    if (tokenHeaderAuth === "" || JWT_simpleVerifyExpirationTokenUser(tokenHeaderAuth)) {
        res.status(401).json({
            ok: false,
            message: "El usuario ha expirado",
            isTokenExpired: tokenHeaderAuth === "" ? false : true
        });

    } else {

        const RESULT = QUERY_MYSQL("GET_ALL_DATA_SIMPLE", "reservations");

        RESULT.then((data) => {

            if (data.code === "201") {

                delete data.bonus;

                data.data.forEach((e) => {
                    delete e.password
                });

                if (data.data.length === 0) {
                    res.status(201).json({
                        ok: true,
                        data: [],
                        message: "No hay reservaciones por ahora"
                    });
                } else {
                    res.status(201).json(data);
                }

            } else if (data.code === "500") {
                res.status(parseInt(data.code)).json(data);

            }

        });
    }
}

const ReservationGetSearchController = (req, res) => {

    const tokenHeaderAuth = req.headers.usuario_autorizacion;

    const { fullname } = req.query;

    if (tokenHeaderAuth === "" || JWT_simpleVerifyExpirationTokenUser(tokenHeaderAuth)) {
        res.status(401).json({
            ok: false,
            message: "El usuario ha expirado",
            isTokenExpired: tokenHeaderAuth === "" ? false : true
        });

    } else {

        const RESULT = QUERY_MYSQL("GET_ALL_DATA_SEARCHER", "reservations", [], [], { field: "fullname", value: fullname });

        RESULT.then((data) => {

            if (data.code === "201") {

                delete data.bonus;

                data.data.forEach((e) => {
                    delete e.password
                });

                if (data.data.length === 0) {
                    res.status(201).json({
                        ok: true,
                        data: [],
                        message: "No se ha encontrado resultado"
                    });
                } else {
                    res.status(201).json(data);
                }

            } else if (data.code === "500") {
                res.status(parseInt(data.code)).json(data);

            }

        });
    }
}


const ReservationGetReservationsUserIdController = (req, res) => {

    const tokenHeaderAuth = req.headers.usuario_autorizacion;

    if (tokenHeaderAuth === "" || JWT_simpleVerifyExpirationTokenUser(tokenHeaderAuth)) {
        res.status(401).json({
            ok: false,
            message: "El usuario ha expirado",
            isTokenExpired: tokenHeaderAuth === "" ? false : true
        });

    } else {

        const userID = JWT_simpleDecodeTokenUser(tokenHeaderAuth).id

        const RESULT = QUERY_MYSQL("GET_ALL_DATA_BY_USER_ID", "reservations", [], [], { field: "userId", value: userID });

        RESULT.then((data) => {

            if (data.code === "201") {

                delete data.bonus;

                data.data.forEach((e) => {
                    delete e.password
                });

                if (data.data.length === 0) {
                    res.status(201).json({
                        ok: true,
                        data: [],
                        message: "No has reservado nada"
                    });
                } else {
                    res.status(201).json(data);
                }

            } else if (data.code === "500") {
                res.status(parseInt(data.code)).json(data);

            }

        });
    }
}



module.exports = {
    ReservationPostController,
    ReservationGetController,
    ReservationGetSearchController,
    ReservationGetReservationsUserIdController
}
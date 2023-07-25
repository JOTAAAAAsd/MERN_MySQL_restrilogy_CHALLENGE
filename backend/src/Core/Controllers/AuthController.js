const bcrypt = require("bcrypt-nodejs");
const QUERY_MYSQL = require("../../config/queryConfig");

const { getdate, getHour } = require("../../config/myFormatDate");
const { JWT_simpleCreateTokenAccess } = require("../../config/jwtSimple");


const AuthPostRegisterController = async (req, res) => {

    const { username, fullname, password, repeat_password } = req.body;

    if (username.trim() === "" || fullname.trim() === "" || password.trim() === "" || repeat_password.trim() === "") {
        res.status(404).json({
            ok: false,
            message: "Todos los campos son requeridos"
        });

    } else if (password !== repeat_password) {
        res.status(404).json({
            ok: false,
            message: "Las contraseñas deben ser iguales"
        });

    } else {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) {
                res.status(500).json({
                    ok: false,
                    message: "Error del servidor"
                });
            } else {
                bcrypt.hash(password, salt, null, (error, hash) => {
                    if (error) {
                        res.status(500).json({
                            ok: false,
                            message: "Error del servidor"
                        });
                    } else {

                        const hash_password = hash

                        const created_at = `${getdate(new Date)} | ${getHour(new Date)}`;

                        const RESULT = QUERY_MYSQL("INSERT_DATA_SIMPLE", "users", ["username", "fullname", "password", "type_account", "created_at"],
                            [username, fullname, hash_password, username === "adminOK" ? "Employee" : "Client", created_at]);


                        RESULT.then((data) => {

                            if (data.code === "201") {
                                res.status(201).json({
                                    ok: true,
                                    message: "Usuario registrado correctamente"
                                });

                            } else if (data.code === "500") {
                                res.status(parseInt(data.code)).json(data);

                            }

                        });
                    }
                });
            }
        });
    }
}

const AuthPostLoginController = async (req, res) => {

    const { username, password } = req.body;

    if (username.trim() === "" || password.trim() === "") {
        res.status(404).json({
            ok: false,
            message: "Todos los campos son requeridos"
        });
    }

    const RESULT = QUERY_MYSQL("INSERT_DATA_IF_EXISTS", "users", ["username", "password"], [username, password],
        { field: "username", value: username });


    RESULT.then((data) => {

        if (data.code === "201") {

            if (data.bonus.length === 0) {
                res.status(404).json({
                    ok: false,
                    message: "No se encuentra el usuario registrado"
                });

            } else {

                bcrypt.compare(password, data.bonus[0].password, function (error, isEncrypt) {

                    if (error) {
                        res.status(500).json({
                            ok: false,
                            message: "Error del servidor"
                        });
                    } else if (!isEncrypt) {
                        res.status(500).json({
                            ok: false,
                            message: "Error del servidor"
                        });
                    } else {
                        res.status(201).json({
                            ok: true,
                            token_access: JWT_simpleCreateTokenAccess(data.bonus[0]),
                            message: "Has accedido correctamente"
                        });
                    }
                });
            }

        } else if (data.code === "500") {
            res.status(parseInt(data.code)).json(data);

        }

    });
}


module.exports = {
    AuthPostRegisterController,
    AuthPostLoginController
}
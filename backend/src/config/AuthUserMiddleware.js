const moment = require("moment");
const jwt_simple = require("jwt-simple");

const AuthIsUserAuthenticatedMiddleware = (req, res, next) => {

    if (!req.headers.usuario_autorizacion) {
        return res.status(403).json({
            ok: false,
            message: "No hay header en la petición"
        });
    }

    const req_token_header = req.headers.usuario_autorizacion.replace(/['"]+/g, "");

    try {

        let payload = jwt_simple.decode(req_token_header, process.env.JWT_KEYWORD);

        if (payload.token_expiration <= moment.unix()) {

            return res.status(401).json({
                ok: false,
                message: "El token ha expirado :D"
            });
        }

        req.user = payload;

    } catch (error) {
        return res.status(404).json({
            ok: false,
            expiration: null,
            message: error.message
        });
    }

    next();
}

module.exports = {
    AuthIsUserAuthenticatedMiddleware
}





const { Router } = require("express");

const { AuthIsUserAuthenticatedMiddleware } = require("../config/AuthUserMiddleware");
const { AuthPostRegisterController, AuthPostLoginController } = require("./Controllers/AuthController");
const { ReservationPostController, ReservationGetController, ReservationGetSearchController, ReservationGetReservationsUserIdController} = require("./Controllers/ReservationController");

const router = Router();

const RoutingAuth = (app) => {
    return {
        postRegister: app.use(router.post("/api/v1/auth/user-register", AuthPostRegisterController)),
        postLogin: app.use(router.post("/api/v1/auth/user-login", AuthPostLoginController)),
    };
};

const RoutingReservation = (app) => {
    return {
        postReservation: app.use(router.post("/api/v1/reservation/post", AuthIsUserAuthenticatedMiddleware, ReservationPostController)),
        getReservation: app.use(router.get("/api/v1/reservation/get", AuthIsUserAuthenticatedMiddleware, ReservationGetController)),
        getSearchReservation: app.use(router.get("/api/v1/reservation/get-search?", ReservationGetSearchController)),
        getReservationsUserId: app.use(router.get("/api/v1/reservation/get-reservations-userId/:id", ReservationGetReservationsUserIdController)),
    };
};


module.exports = {
    RoutingAuth,
    RoutingReservation
}
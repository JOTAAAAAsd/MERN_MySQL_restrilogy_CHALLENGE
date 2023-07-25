const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const { RoutingAuth, RoutingReservation } = require("./src/Core/RoutingApp");

dotenv.config();

const PORT = process.env.PORT || process.env.PORT_BACKEND_LOCAL;


const app = express();


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization,usuario_autorizacion,  X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

RoutingAuth(app);
RoutingReservation(app);





app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

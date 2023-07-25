const { createPool } = require("mysql2/promise");

const options = {
    host: "localhost",
    port: 3306,
    user: "gaston",
    password: "mowen",
    database: "restaurant_trilogy"
};

const connectionMySQL = createPool(options);

module.exports = connectionMySQL;
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "root",
    // Your password
    password: "hot&heavy",
    database: "employees"
});
connection.connect(function (err) {
    if (err) throw err;
});
module.exports = connection;
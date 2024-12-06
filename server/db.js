const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'manager', 
    database: 'ecowiserDb',
}).promise();

module.exports = db;

var mysql = require('mysql');
var connection  = mysql.createPool({
  connectionLimit : 10,
  host : process.env["MYSQL_HOST"],
  user : process.env["MYSQL_USER"],
  password : process.env["MYSQL_PASS"],
  database : process.env["MYSQL_DATABASE"]
});

module.exports = connection;
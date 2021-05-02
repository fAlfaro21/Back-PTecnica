const mysql = require('mysql');

const DB = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'route123',
  database : 'tiendadb'
});

module.exports = DB
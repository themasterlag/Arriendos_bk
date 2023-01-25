const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'arriendos'
});

connection.connect(function(err){
  if(err){
    //console.log(err.code);
   // console.log(err.fatal);
    console.error(err);
  }
  console.log("conectado \n");

});

module.exports = connection;

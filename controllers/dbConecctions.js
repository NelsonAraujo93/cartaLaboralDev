'use strict'

const mysql = require('mysql');
require('dotenv').config();


const connection2 = mysql.createConnection({
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  //port : 3306,
  database : process.env.DATABASE_2
});
module.exports = connection2;
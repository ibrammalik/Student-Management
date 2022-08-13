require("dotenv").config();
const mysql = require("mysql");

//Buat Koneksi Dengan Database
const db = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = db;

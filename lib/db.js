require("dotenv").config();
const mysql = require("mysql");

//Buat Koneksi Dengan Database
const pool = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

// ... later
pool.query("select 1 + 1", (err, rows) => {
  /* */
});

module.exports = pool;

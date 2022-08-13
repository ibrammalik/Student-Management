const mysql = require("mysql");

//Buat Koneksi Dengan Database
const db = mysql.createConnection({
  host: "localhost",
  database: "school",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = db;

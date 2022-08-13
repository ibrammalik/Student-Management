require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const pool = require("../lib/db");

//untuk get data
app.get("/", (req, res) => {
  const sql = "SELECT * FROM user";
  pool.query(sql, (err, result) => {
    const users = JSON.parse(JSON.stringify(result));
    res.render("index", { users: users, title: "Student List" });
  });

  //untuk insert data
  app.get("/add", (req, res) => {
    res.render("adduser", { title: "Daftar Siswa | Tambah Siswa" });
  });
  app.post("/add-user", (req, res) => {
    const insertSql = `INSERT INTO user (nama, nim, kelas) VALUES ('${req.body.nama}', '${req.body.nim}', '${req.body.kelas}')`;
    pool.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

//Untuk Edit Data
app.get("/edit/:userId", (req, res) => {
  const userID = req.params.userId;
  let sql = `SELECT * FROM user WHERE ID = ${userID}`;
  pool.query(sql, (err, result) => {
    res.render("edituser", {
      user: result[0],
      title: "Daftar Siswa | Edit Siswa",
    });
  });
});
app.post("/update", (req, res) => {
  const sql = `UPDATE user SET 
                      nama = '${req.body.nama}', 
                      nim = '${req.body.nim}', 
                      kelas = '${req.body.kelas}' 
                      WHERE ID = '${req.body.userId}'
                    `;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//Untuk Delete Data
app.get("/delete/:userId", (req, res) => {
  const userID = req.params.userId;
  let sql = `DELETE FROM user WHERE ID = ${userID}`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = app;

const express = require("express");
const router = express.Router();
const pool = require("../lib/db");

//untuk get data
router.get("/", (req, res) => {
    const sql = "SELECT * FROM user";
    pool.query(sql, (err, result) => {
        const users = JSON.parse(JSON.stringify(result));
        res.render("index", { users: users, title: "Student List" });
    });
});

//untuk insert data
router.get("/add", (req, res) => {
    res.render("adduser", { title: "Daftar Siswa | Tambah Siswa" });
});
router.post("/add-user", (req, res) => {
    const insertSql = `INSERT INTO user (nama, nim, kelas) VALUES ('${req.body.nama}', '${req.body.nim}', '${req.body.kelas}')`;
    pool.query(insertSql, (err, result) => {
        if (err) throw err;
        res.redirect("/");
    });
});

//Untuk Edit Data
router.get("/edit/:userId", (req, res) => {
    const userID = req.params.userId;
    let sql = `SELECT * FROM user WHERE ID = ${userID}`;
    pool.query(sql, (err, result) => {
        res.render("edituser", {
            user: result[0],
            title: "Daftar Siswa | Edit Siswa",
        });
    });
});

router.post("/update", (req, res) => {
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
router.get("/delete/:userId", (req, res) => {
    const userID = req.params.userId;
    let sql = `DELETE FROM user WHERE ID = ${userID}`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect("/");
    });
});

module.exports = router;

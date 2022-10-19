const express = require("express");
const router = express.Router();
const { Student } = require("../lib/db");

//untuk get data
router.get("/", async (req, res) => {
    try {
        const users = await Student.findAll();
        res.render("index", { users, title: "Student List" });
    } catch (error) {
        res.send(error);
    }
});

//untuk insert data
router.get("/add", (req, res) => {
    res.render("adduser", { title: "Daftar Siswa | Tambah Siswa" });
});
router.post("/add-user", async (req, res) => {
    try {
        await Student.create({ NAMA: req.body.nama, NIM: req.body.nim, KELAS: req.body.kelas });
        res.redirect("/");
    } catch (error) {
        res.send(error);
    }
});

//Untuk Edit Data
router.get("/edit/:userId", async (req, res) => {
    try {
        const user = await Student.findOne({ where: { ID: req.params.userId } });
        res.render("edituser", { user, title: "Daftar Siswa | Edit Siswa" });
    } catch (error) {
        res.send(error.message);
    }
});
router.post("/update", async (req, res) => {
    try {
        await Student.update({ NAMA: req.body.nama, NIM: req.body.nim, KELAS: req.body.kelas }, { where: { ID: req.body.userId } });
        res.redirect("/");
    } catch (error) {
        res.send(error.message);
    }
});

//Untuk Delete Data
router.get("/delete/:userId", async (req, res) => {
    try {
        await Student.destroy({ where: { ID: req.params.userId } });
        res.redirect("/");
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;

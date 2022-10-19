require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

//Buat Koneksi Dengan Database
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
});

const Student = sequelize.define("Student", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NAMA: {
        type: DataTypes.STRING,
    },
    NIM: {
        type: DataTypes.STRING,
    },
    KELAS: {
        type: DataTypes.STRING,
    },
});

module.exports = { Student, sequelize };

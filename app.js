require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/user.router");
const { sequelize } = require("./lib/db");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(router);

app.listen(process.env.PORT, async () => {
    // await sequelize.sync({ force: true }).then(() => {
    //     console.log("DB resync");
    // });
    console.log(`server listening...`);
});

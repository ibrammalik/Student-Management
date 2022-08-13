const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/router");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(router);

app.listen(8000, () => {
  console.log("<!----- SERVER READY ----->", "Listening at http://localhost:8000/");
});

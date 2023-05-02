const express = require("express");
const app = express();
require("./src/connectServerAndMongoDB");

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

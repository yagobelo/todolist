const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

const ConnectServerAndMongoDB = async () => {
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Connection MongoDB: OK");
      app.listen(PORT, () => {
        console.log("Connection Server: OK");
      });
    })
    .catch((err) => {
      console.log("Connection MongoDB: Error => " + err);
    });
};

module.exports = ConnectServerAndMongoDB;

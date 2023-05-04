const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// ------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ------------------------------------------------------------------ Defined router: /task

const taskRoutes = require("./src/routes/taskRoutes");
app.use("/task", taskRoutes);

// ------------------------------------------------------------------ Endpoint

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

// ------------------------------------------------------------------ Open conection with server and mongoDB

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

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

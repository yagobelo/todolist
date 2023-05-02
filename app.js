const express = require("express");
const app = express();
require("./src/connectServerAndMongoDB");

app.use(express.json());

const taskRoutes = require("./src/routes/taskRoutes");
app.use("/task", taskRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

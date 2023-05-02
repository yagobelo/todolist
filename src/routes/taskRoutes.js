const router = require("express").Router();
const Task = require("../models/Taks");

router.post("/", async (req, res) => {
  const newTask = {
    title: req.body.title,
    description: req.body.description,
  };

  try {
    await Task.create(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json("Error to create new task: " + error);
  }
});

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

module.exports = router;

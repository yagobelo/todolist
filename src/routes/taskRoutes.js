const router = require("express").Router();
const Task = require("../models/Task");

// ------------------------------------------------------------------------ Insert new task

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

// ------------------------------------------------------------------------ Read all tasks

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

// ------------------------------------------------------------------------ Read one task from id

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findOne({ _id: id });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json("Error to find task: " + error);
  }
});

// ------------------------------------------------------------------------- Read tasks from params(complet)

router.get("/complet/:complet", async (req, res) => {
  const tasks = await Task.find({ complet: req.params.complet });
  res.status(200).json(tasks);
});

// ------------------------------------------------------------------------ Update task from id

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const task = {
    title: req.body.title,
    description: req.body.description,
    complet: req.body.complet,
  };

  try {
    await Task.updateOne({ _id: id }, task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json("Error to update task: " + error);
  }
});

// ------------------------------------------------------------------------ Delete task from id

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Task.deleteOne({ _id: id });
    res.status(200).json("Task deleted ");
  } catch (error) {
    res.status(500).json("Error to delete task: " + error);
  }
});

module.exports = router;

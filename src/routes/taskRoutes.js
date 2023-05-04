const router = require("express").Router();
const Task = require("../models/Task");

// ------------------------------------------------------------------------ Insert new task

router.post("/", async (req, res) => {
  const { title, description } = req.body;

  try {
    const taskExist = await Task.findOne({ title: title });
    if (taskExist) {
      return res.status(422).json("Ja existe uma tarefa com esse nome!");
    }
    const newTask = {
      title: req.body.title,
      description: req.body.description,
    };
    await Task.create(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json("Error to create new task: " + error);
  }
});

// ------------------------------------------------------------------------ Read all tasks to a tasks from status

router.get("/", async (req, res) => {
  const status = req.query.status;
  if (!status) {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } else {
    const tasks = await Task.find({ status: status });
    return res.status(200).json(tasks);
  }
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

// ------------------------------------------------------------------------ Update task from id

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const task = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
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
    const taskdelete = await Task.deleteOne({ _id: id });
    if (!taskdelete) {
      return res.status(422).json("Essa tarefa não existe!");
    }
    res.status(200).json("Task deleted ");
  } catch (error) {
    res.status(500).json("Error to delete task: " + error);
  }
});

module.exports = router;

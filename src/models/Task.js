const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Titulo não declarado!",
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "nao-concluida",
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;

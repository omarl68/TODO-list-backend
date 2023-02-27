const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "must be have a title"],
    minLength: 2,
    maxLength: 20,
  },
  description: {
    type: String,
    trim: true,
  },
  statustask: {
    type: String,
    enum: ["pending", "in_progress", "done"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

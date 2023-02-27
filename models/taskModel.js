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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Comments"
  }]
});

taskSchema.pre(/^find/,function(next){
    this.populate({path:"comments"});
    next()
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

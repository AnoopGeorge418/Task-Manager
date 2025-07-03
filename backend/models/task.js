const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  taskId: {
    type: Number,
    required: true
  },
  taskInfo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "In Process", "Due", "Completed", "Deleted"],
    default: "Pending"
  },
  deletedOn: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);

const Task = require("../models/task");

// Create a new task
const createTask = async (req, res) => {
  const { userEmail, taskInfo } = req.body;

  if (!userEmail || !taskInfo) {
    return res.status(400).json({ msg: "All fields required" });
  }

  const newTask = new Task({
    userEmail,
    taskId: Date.now(),
    taskInfo
  });

  try {
    await newTask.save();
    res.status(201).json({ msg: "Task created", task: newTask });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userEmail: req.query.email, status: { $ne: "Deleted" } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { taskInfo, status } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { taskId: req.params.id },
      { taskInfo, status },
      { new: true }
    );
    res.json({ msg: "Task updated", task });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Soft delete
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { taskId: req.params.id },
      { status: "Deleted", deletedOn: new Date().toISOString().split("T")[0] },
      { new: true }
    );
    res.json({ msg: "Task moved to trash", task });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Restore task
const restoreTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { taskId: req.params.id },
      { status: "Pending", deletedOn: null },
      { new: true }
    );
    res.json({ msg: "Task restored", task });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Permanent delete
const permDelete = async (req, res) => {
  try {
    await Task.findOneAndDelete({ taskId: req.params.id });
    res.json({ msg: "Task permanently deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  restoreTask,
  permDelete
};

import Task from "../models/Task.js";
import { loadTasks, saveTasks } from "../utils/fileHelper.js";

// ✅ Get all tasks
export const getTasks = (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
};

// ✅ Create a new task
export const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  const tasks = loadTasks();
  const newTask = new Task(undefined, title, description, false); // ✅ Generate ID inside Task model
  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json(newTask);
};

// ✅ Update an existing task
export const updateTask = (req, res) => {
  const { title, description, completed } = req.body;
  if (title === undefined && description === undefined && completed === undefined) {
    return res.status(400).json({ message: "At least one field must be updated." });
  }

  const tasks = loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === req.params.id);

  if (taskIndex !== -1) {
    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (completed !== undefined) tasks[taskIndex].completed = Boolean(completed);

    saveTasks(tasks);
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

// ✅ Delete a task
export const deleteTask = (req, res) => {
  let tasks = loadTasks();
  const filteredTasks = tasks.filter((task) => task.id !== req.params.id);

  if (filteredTasks.length === tasks.length) {
    return res.status(404).json({ message: "Task not found" });
  }

  saveTasks(filteredTasks);
  res.json({ message: "Task deleted successfully" });
};

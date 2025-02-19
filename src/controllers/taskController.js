import Task from "../models/task.js";
import { loadTasks, saveTasks } from "../utils/fileHelper.js";

// ✅ Get all tasks
export const getTasks = (req, res) => {
  const tasks = loadTasks();
  return res.json(tasks);
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

  return res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const { title, description, completed, toggle } = req.body;
  let tasks = loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Update only the fields provided
  if (title !== undefined) tasks[taskIndex].title = title;
  if (description !== undefined) tasks[taskIndex].description = description;

  // Toggle `completed` only when `toggle: true` is explicitly passed
  if (toggle) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
  } 
  // Otherwise, set `completed` only if provided
  else if (completed !== undefined) {
    tasks[taskIndex].completed = Boolean(completed);
  }

  saveTasks(tasks);
  return res.json({ message: "Task updated successfully", task: tasks[taskIndex] });
};


// ✅ Delete a task
export const deleteTask = (req, res) => {
  let tasks = loadTasks();
  const filteredTasks = tasks.filter((task) => task.id !== req.params.id);

  if (filteredTasks.length === tasks.length) {
    return res.status(404).json({ message: "Task not found" });
  }

  saveTasks(filteredTasks);
  return res.json({ message: "Task deleted successfully" });
};

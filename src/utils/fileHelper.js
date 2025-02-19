import fs from "fs";
import path from "path";

const TASKS_FILE = path.resolve("src/data/tasks.json");

export const loadTasks = () => {
  try {
    if (fs.existsSync(TASKS_FILE)) {
      return JSON.parse(fs.readFileSync(TASKS_FILE, "utf8"));
    }
    return [];
  } catch (error) {
    console.error("Error reading tasks.json:", error);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Error saving tasks.json:", error);
  }
};

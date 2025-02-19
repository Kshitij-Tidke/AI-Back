import { v4 as uuidv4 } from "uuid";

class Task {
  constructor(id = uuidv4(), title, description, completed = false) {
    this.id = id;  // ✅ Assign id properly
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
}

export default Task;

import { loadTasks, saveTasks } from './storage.js';

export function renderTasks(taskList, filter = "", category = "") {
  taskList.innerHTML = "";
  const tasks = loadTasks();
  tasks
    .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()) && (!category || task.category === category))
    .forEach(task => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleComplete(task.id));

      const span = document.createElement("span");
      span.textContent = `[${task.category}] ${task.text}`;
      if (task.completed) span.classList.add("completed");

      const del = document.createElement("button");
      del.textContent = "Delete";
      del.addEventListener("click", () => deleteTask(task.id));

      li.append(checkbox, span, del);
      taskList.appendChild(li);
    });
}

export function addTask(text, category) {
  const tasks = loadTasks();
  tasks.push({ id: Date.now(), text, category, completed: false });
  saveTasks(tasks);
}

export function deleteTask(id) {
  const tasks = loadTasks().filter(task => task.id !== id);
  saveTasks(tasks);
  location.reload();
}

export function toggleComplete(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  saveTasks(tasks);
  location.reload();
}

export function clearAllTasks() {
  saveTasks([]);
  location.reload();
}
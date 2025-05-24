import { debounce, throttle } from './scripts.js';
import { renderTasks, addTask, clearAllTasks } from './taskManager.js';

const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addBtn = document.getElementById("add-task");
const searchInput = document.getElementById("search-task");
const categorySelect = document.getElementById("task-category");
const clearBtn = document.getElementById("clear-all");
const backToTopBtn = document.getElementById("back-to-top");

function updateTasks() {
  renderTasks(taskList, searchInput.value, categorySelect.value);
}

addBtn.addEventListener("click", () => {
  if (newTaskInput.value.trim()) {
    addTask(newTaskInput.value.trim(), categorySelect.value);
    newTaskInput.value = "";
    updateTasks();
  }
});

searchInput.addEventListener("input", debounce(updateTasks, 300));
categorySelect.addEventListener("change", updateTasks);
clearBtn.addEventListener("click", clearAllTasks);

window.addEventListener("scroll", throttle(() => {
  backToTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
}, 200));

backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.addEventListener("DOMContentLoaded", updateTasks);
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

function getTasksFromStorage() {
  const tasksFromStorage = localStorage.getItem("list");
  if (tasksFromStorage) {
    return JSON.parse(tasksFromStorage);
  } else {
    return [];
  }
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("list", JSON.stringify(tasks));
}

function renderTasks() {
  ulEl.innerHTML = "";
  const tasks = getTasksFromStorage();
  tasks.forEach(task => addTaskToDOM(task));
}

function addTaskToDOM(task) {
  const liEl = document.createElement("li");
  liEl.innerText = task.name;
  if (task.checked) liEl.classList.add("checked");
  
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
  checkBtnEl.onclick = () => {
    liEl.classList.toggle("checked");
    updateTasks();
  };
  
  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
  trashBtnEl.onclick = () => {
    liEl.remove();
    updateTasks();
  };
  
  liEl.append(checkBtnEl, trashBtnEl);
  ulEl.appendChild(liEl);
}

function updateTasks() {
  const tasks = Array.from(ulEl.children).map(li => ({
    name: li.firstChild.textContent,
    checked: li.classList.contains("checked"),
  }));
  saveTasksToStorage(tasks);
}

formEl.onsubmit = (e) => {
  e.preventDefault();
  const taskName = inputEl.value.trim();
  if (taskName) {
    const task = { name: taskName, checked: false };
    addTaskToDOM(task);
    updateTasks();
    inputEl.value = "";
  }
};

document.addEventListener("DOMContentLoaded", renderTasks);

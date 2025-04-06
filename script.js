const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Переключение темы
function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// Проверка сохранённой темы при загрузке
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";
    addEventListeners();
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    const li = document.createElement("li");
    li.innerHTML = `
    <span>${taskText}</span>
    <div class="controls">
        <button onclick="completeTask(this)"><img src="images/ready.png" alt="Готово"></button>
        <button onclick="editTask(this)"><img src="images/edit.png" alt="Редактировать"></button>
        <button onclick="deleteTask(this)"><img src="images/delete.png" alt="Удалить"></button>
    </div>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
}

function completeTask(button) {
    const li = button.closest("li");
    li.classList.toggle("completed");
    li.classList.add("edited");
    setTimeout(() => li.classList.remove("edited"), 0);
    saveTasks();
}

function editTask(button) {
    const li = button.closest("li");
    const span = li.querySelector("span");
    const newText = prompt("Изменить задачу:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
    span.textContent = newText.trim();
    li.classList.add("edited");
    setTimeout(() => li.classList.remove("edited"), 0);
    saveTasks();
    }
}

function deleteTask(button) {
    const li = button.closest("li");
    li.classList.add("fade-out");
    setTimeout(() => {
    li.remove();
    saveTasks();
    }, 600);
}

taskInput.addEventListener("keydown", e => {
    if (e.key === "Enter") addTask();
});

function addEventListeners() {
    document.querySelectorAll(".controls button:nth-child(1)").forEach(btn => btn.onclick = () => completeTask(btn));
    document.querySelectorAll(".controls button:nth-child(2)").forEach(btn => btn.onclick = () => editTask(btn));
    document.querySelectorAll(".controls button:nth-child(3)").forEach(btn => btn.onclick = () => deleteTask(btn));
}

loadTasks();
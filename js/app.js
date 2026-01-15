document.addEventListener("DOMContentLoaded", function () {
  // ----- TASK ARRAY -----
  let tasks = [];

  // ----- SELECT ELEMENTS -----
  const taskForm = document.getElementById("taskForm");
  const titleInput = document.getElementById("title");
  const dateInput = document.getElementById("dueDate");
  const priorityInput = document.getElementById("priority");
  const taskList = document.getElementById("taskList");

  // ----- LOCAL STORAGE KEY -----
  const STORAGE_KEY = "smartTasks";

  // ----- LOAD TASKS FROM LOCALSTORAGE -----
  function loadTasks() {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    } else {
      tasks = [];
    }
    renderTasks();
  }

  // ----- SAVE TASKS TO LOCALSTORAGE -----
  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // ----- FORM SUBMIT -----
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const dueDate = dateInput.value;
    const priority = priorityInput.value;

    if (title === "" || dueDate === "") {
      alert("Please enter task title and due date");
      return;
    }

    addTask(title, dueDate, priority);
  });

  // ----- ADD TASK -----
  function addTask(title, dueDate, priority) {
    const task = {
      id: Date.now(),
      title,
      dueDate,
      priority,
      completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    clearForm();
  }

  // ----- RENDER TASKS -----
  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
      const li = document.createElement("li");

      if (task.completed) {
        li.classList.add("completed");
      }

      li.innerHTML = `
        <strong>${task.title}</strong><br>
        Due: ${task.dueDate}<br>
        Priority: ${task.priority}<br>
      `;

      // Complete checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
      });

      li.prepend(checkbox);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  }

  // ----- CLEAR FORM -----
  function clearForm() {
    taskForm.reset();
    titleInput.focus();
  }

  // ----- INITIAL LOAD -----
  loadTasks();
});

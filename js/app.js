document.addEventListener("DOMContentLoaded", function () {
  let tasks = [];
  const STORAGE_KEY = "smartTasks";

  // Elements
  const taskForm = document.getElementById("taskForm");
  const titleInput = document.getElementById("title");
  const dateInput = document.getElementById("dueDate");
  const priorityInput = document.getElementById("priority");
  const taskList = document.getElementById("taskList");

  const filtersDiv = document.getElementById("filters");
  const totalCount = document.getElementById("totalCount");
  const completedCount = document.getElementById("completedCount");
  const pendingCount = document.getElementById("pendingCount");

  // ----- LOCALSTORAGE -----
  function loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    tasks = stored ? JSON.parse(stored) : [];
    renderTasks(tasks);
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // ----- FORM SUBMIT -----
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = titleInput.value.trim();
    const dueDate = dateInput.value;
    const priority = priorityInput.value;

    if (!title || !dueDate) {
      alert("Please enter title and due date");
      return;
    }

    addTask(title, dueDate, priority);
  });

  // ----- ADD TASK -----
  function addTask(title, dueDate, priority) {
    tasks.push({
      id: Date.now(),
      title,
      dueDate,
      priority,
      completed: false
    });
    saveTasks();
    renderTasks(tasks);
    clearForm();
  }

  // ----- CLEAR FORM -----
  function clearForm() {
    taskForm.reset();
    titleInput.focus();
  }

  // ----- CHECK OVERDUE -----
  function isOverdue(task) {
    const today = new Date().setHours(0,0,0,0);
    const due = new Date(task.dueDate).setHours(0,0,0,0);
    return !task.completed && due < today;
  }

  // ----- PRIORITY SORT -----
  function sortTasksByPriority(taskArray) {
    const order = { High: 1, Medium: 2, Low: 3 };
    return taskArray.sort((a,b) => order[a.priority] - order[b.priority]);
  }

  // ----- RENDER TASKS -----
  function renderTasks(taskArray) {
    const sortedTasks = sortTasksByPriority([...taskArray]);
    taskList.innerHTML = "";

    sortedTasks.forEach(task => {
      const li = document.createElement("li");

      if (task.completed) li.classList.add("completed");
      if (isOverdue(task)) li.classList.add("overdue");
      if (task.priority === "High") li.classList.add("high-priority");

      li.innerHTML = `
        <strong>${task.title}</strong><br>
        Due: ${task.dueDate}<br>
        Priority: ${task.priority}<br>
      `;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks(tasks);
      });

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks(tasks);
      });

      li.prepend(checkbox);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });

    updateSummary(taskArray);
  }

  // ----- FILTER LOGIC -----
  function filterTasks(status) {
    let filtered = tasks;
    if (status === "pending") filtered = tasks.filter(t => !t.completed);
    else if (status === "completed") filtered = tasks.filter(t => t.completed);

    renderTasks(filtered);
  }

  // ----- FILTER BUTTON EVENTS -----
  filtersDiv.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const status = e.target.dataset.status;
      filterTasks(status);
    }
  });

  // ----- SUMMARY -----
  function updateSummary(taskArray) {
    totalCount.textContent = taskArray.length;
    completedCount.textContent = taskArray.filter(t => t.completed).length;
    pendingCount.textContent = taskArray.filter(t => !t.completed).length;
  }

  // ----- INITIAL LOAD -----
  loadTasks();
});

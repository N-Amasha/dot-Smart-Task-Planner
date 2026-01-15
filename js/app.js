document.addEventListener("DOMContentLoaded",function() {
    let tasks = [];

    const taskForm = document.getElementById("taskForm");
    const titleInput = document.getElementById("title");
    const dateInput = document.getElementById("dueDate");
    const priorityInput = document.getElementById("priority");
    const taskList = document.getElementById("taskList");

    //capture form submit
    taskForm.addEventListener("submit",function (e) {
        e.preventDefault();

        const title = titleInput.value.trim();
        const dueDate = dateInput.value;
        const priority = priorityInput.value;

        //validation
        if(title === "" || dueDate === ""){
            alert("Please enter task title and due date");
            return;
        }

        addTask(title,dueDate,priority);
    });

    //add task to array
    function addTask(title,dueDate,priority){
        const task = {
            id: Date.now(),
            title: title,
            dueDate: dueDate,
            priority: priority,
            completed: false
        };

        tasks.push(task);
        renderTasks();
        clearForm();
    }


    //render task list(DOM Manipulation)
    function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        // Apply completed style
        if(task.completed){
            li.classList.add("completed");
        }

        // Title + date + priority
        li.innerHTML = `
          <strong>${task.title}</strong><br>
          Due: ${task.dueDate}<br>
          Priority: ${task.priority}<br>
        `;

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = !task.completed;
            renderTasks();
        });

        // Create delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });

        li.prepend(checkbox); // Add checkbox at start
        li.appendChild(delBtn); // Add delete button at end

        taskList.appendChild(li);
    });
}



    //clear form after submit
    function clearForm(){
        taskForm.reset();
        titleInput.focus();
    }


    window.toggleComplete = function(id){
        const task = tasks.find(task => task.id === id);

        if(task){
            task.completed = !task.completed;
            renderTasks();
        }
    }


    window.deleteTask = function(id){
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }


    // Complete checkbox
    li.querySelector("input[type='checkbox']").addEventListener("change", () => {
    task.completed = !task.completed;
    renderTasks();
    });

    // Delete button
    li.querySelector("button").addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    renderTasks();
    });

});
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
    function renderTasks(){
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${task.title}</strong><br>
                Due:${task.dueDate}<br>
                Priority:${task.priority}
            `;

            taskList.appendChild(li);
        });
    }


    //clear form after submit
    function clearForm(){
        taskForm.reset();
        titleInput.focus();
    }
});
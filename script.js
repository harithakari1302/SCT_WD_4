let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate");

    if(taskInput.value === ""){
        alert("Please enter a task");
        return;
    }

    let task = {
        text: taskInput.value,
        date: taskDate.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskDate.value = "";
}

function displayTasks() {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        let li = document.createElement("li");

        li.innerHTML = `
            <div class="task-info ${task.completed ? 'completed' : ''}">
                <strong>${task.text}</strong><br>
                <small>${task.date || 'No Date'}</small>
            </div>

            <div class="actions">
                <button onclick="toggleTask(${index})">✔</button>

                <button onclick="editTask(${index})">✏</button>

                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function editTask(index){

    let newTask = prompt(
        "Edit Task",
        tasks[index].text
    );

    if(newTask !== null){
        tasks[index].text = newTask;
        saveTasks();
        displayTasks();
    }
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    displayTasks();
}

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}
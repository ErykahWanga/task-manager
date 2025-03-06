document.addEventListener("DOMContentLoaded", loadTasks);

// Request Notification Permission
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}
console.log("Javascript is working!")

// Function to add a new task
function addTask() {
    alert("Button Clicked!")
    let taskInput = document.getElementById("taskInput");
    let taskTime = document.getElementById("taskTime").value;
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "" || taskTime === "") {
        alert("Please enter a task and select a due date.");
        return;
    }

    // Create a new task item
    let li = document.createElement("li");
    li.innerHTML = `${taskInput.value} (Due: ${taskTime}) 
        <button onclick="removeTask(this)">Delete</button>`;

    // Append to the list
    taskList.appendChild(li);

    // Save task in local storage
    saveTask(taskInput.value, taskTime);

    // Schedule notification
    scheduleNotification(taskInput.value, taskTime);

    // Clear input fields
    taskInput.value = "";
    document.getElementById("taskTime").value = "";
}

// Function to remove a task
function removeTask(button) {
    let li = button.parentElement;
    let taskText = li.innerText.split("(Due:")[0].trim(); // Extract task name

    // Remove from UI
    li.remove();

    // Remove from local storage
    deleteTask(taskText);
}

// Function to save a task in local storage
function saveTask(task, time) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ task, time });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(({ task, time }) => {
        let taskList = document.getElementById("taskList");
        let li = document.createElement("li");
        li.innerHTML = `${task} (Due: ${time}) 
            <button onclick="removeTask(this)">Delete</button>`;
        taskList.appendChild(li);

        // Reschedule notifications after page reload
        scheduleNotification(task, time);
    });
}

// Function to delete a task from local storage
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to schedule a browser notification
function scheduleNotification(task, time) {
    let dueTime = new Date(time).getTime();
    let now = new Date().getTime();
    let delay = dueTime - now;

    if (delay > 0) {
        setTimeout(() => {
            new Notification("Task Reminder", {
                body: `Reminder: ${task} is due!`,
                icon: "https://cdn.create.vista.com/api/media/small/230249078/stock-vector-postpone-icon-flat-element-vector-illustration-of-postpone-icon-flat-isolated-on-clean-background-for" // Optional: Add an icon
            });
        }, delay);
    }
    
}
SVGComponentTransferFunctionElemen

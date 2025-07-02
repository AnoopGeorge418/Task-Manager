document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementsByClassName("addTaskBtn")[0];
    const viewTaskBtn = document.getElementsByClassName("viewTaskBtn")[0]
    const deletedTaskBtn = document.getElementsByClassName("deletedTaskBtn")[0]


    addTaskBtn.onclick = () => {
        const taskInput = document.getElementById("taskLabel");
        const taskLabel = taskInput.value.trim();

        if (taskLabel === "") {
            alert("Please enter a task.");
            return;
        };

        const newTask = {
            taskId: Date.now(),
            taskInfo: taskLabel,
            status: "Pending"
        };
        let taskDetails = JSON.parse(localStorage.getItem("TaskDetails")) || [];
 
        taskDetails.push(newTask);
        localStorage.setItem("TaskDetails", JSON.stringify(taskDetails));

        alert(`Task added: "${taskLabel}" - Check View Tasks to view the tasks just added.`);
        taskInput.value = '';
    }

    viewTaskBtn.onclick = () => {
        window.location.href = './view.html'
    }

    deletedTaskBtn.onclick = () => {
        window.location.href = './deleted.html'
    }

});
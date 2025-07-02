document.addEventListener("DOMContentLoaded", () => {
    const taskListContainer = document.querySelector(".task_list_container");

    let deletedTasks = JSON.parse(localStorage.getItem("DeletedTasks")) || [];

    if (deletedTasks.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "No deleted tasks!";
        msg.style.fontStyle = "italic";
        taskListContainer.appendChild(msg);
        return;
    }

    deletedTasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task_card");

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task_info");

        const title = document.createElement("h3");
        title.textContent = `🧹 ${task.taskInfo}`;

        const deletedOn = document.createElement("p");
        deletedOn.innerHTML = `<strong>Deleted on:</strong> ${task.deletedOn}`;

        const status = document.createElement("p");
        status.innerHTML = `<strong>Status:</strong> ${task.status || "Deleted"}`;

        taskInfo.appendChild(title);
        taskInfo.appendChild(deletedOn);
        taskInfo.appendChild(status);

        const taskActions = document.createElement("div");
        taskActions.classList.add("task_actions");

        const restoreBtn = document.createElement("button");
        restoreBtn.classList.add("restore");
        restoreBtn.textContent = "♻️ Restore";

        const permDeleteBtn = document.createElement("button");
        permDeleteBtn.classList.add("perm_delete");
        permDeleteBtn.textContent = "❌ Delete Permanently";

        // ♻️ Restore Logic
        restoreBtn.addEventListener("click", () => {
            // Remove from deleted
            deletedTasks = deletedTasks.filter(t => t.taskId !== task.taskId);
            localStorage.setItem("DeletedTasks", JSON.stringify(deletedTasks));

            // Add back to main
            const currentTasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];
            const restoredTask = { ...task, status: "Pending" };
            delete restoredTask.deletedOn;

            currentTasks.push(restoredTask);
            localStorage.setItem("TaskDetails", JSON.stringify(currentTasks));

            location.reload();
        });

        // ❌ Permanent Delete Logic
        permDeleteBtn.addEventListener("click", () => {
            deletedTasks = deletedTasks.filter(t => t.taskId !== task.taskId);
            localStorage.setItem("DeletedTasks", JSON.stringify(deletedTasks));
            location.reload();
        });

        taskActions.appendChild(restoreBtn);
        taskActions.appendChild(permDeleteBtn);
        taskCard.appendChild(taskInfo);
        taskCard.appendChild(taskActions);

        taskListContainer.appendChild(taskCard);
    });
});

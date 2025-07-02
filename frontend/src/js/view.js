document.addEventListener("DOMContentLoaded", () => {
    const taskListContainer = document.querySelector(".task_list_container");

    // Step 1 - Fetch from localStorage
    const tasks = JSON.parse(localStorage.getItem("TaskDetails")) || [];

    // Step 2 - No tasks? show friendly message
    if (tasks.length === 0) {
        const noTaskMsg = document.createElement("p");
        noTaskMsg.textContent = "You have not added any tasks yet!";
        noTaskMsg.style.fontStyle = "italic";
        taskListContainer.appendChild(noTaskMsg);
        return;
    }

    // Step 3 - Loop through tasks and build task cards
    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task_card");

        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task_info");

        const taskTitle = document.createElement("h3");
        taskTitle.textContent = `📌 ${task.taskInfo}`;

        const status = document.createElement("p");
        const taskStatus = task.status || "Pending";
        status.innerHTML = `<strong>Status:</strong> ${taskStatus}`;

        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(status);

        const taskActions = document.createElement("div");
        taskActions.classList.add("task_actions");

        const updateBtn = document.createElement("button");
        updateBtn.classList.add("update");
        updateBtn.textContent = "✏️ Update";

        updateBtn.addEventListener("click", () => {
            // ✅ Fix: Clear content the correct way
            taskInfo.innerHTML = "";

            // Editable title
            const titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.value = task.taskInfo;
            titleInput.classList.add("edit_title");

            // Status dropdown
            const statusSelect = document.createElement("select");
            statusSelect.classList.add("edit_status");

            const statuses = ["Pending", "In Process", "Due", "Completed"];
            statuses.forEach(s => {
                const option = document.createElement("option");
                option.value = s;
                option.textContent = s;
                if (task.status === s || (!task.status && s === "Pending")) {
                    option.selected = true;
                }
                statusSelect.appendChild(option);
            });

            // Save and Cancel buttons
            const saveBtn = document.createElement("button");
            saveBtn.textContent = "✅ Save";
            saveBtn.classList.add("save");

            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "❌ Cancel";
            cancelBtn.classList.add("cancel");

            // Append inputs
            taskInfo.appendChild(titleInput);
            taskInfo.appendChild(statusSelect);
            taskInfo.appendChild(saveBtn);
            taskInfo.appendChild(cancelBtn);

            // Save logic
            saveBtn.addEventListener("click", () => {
                const updatedTitle = titleInput.value.trim();
                const updatedStatus = statusSelect.value;

                if (updatedTitle === "") {
                    alert("Title can't be empty.");
                    return;
                }

                // Update task object
                task.taskInfo = updatedTitle;
                task.status = updatedStatus;

                const updatedTasks = tasks.map(t =>
                    t.taskId === task.taskId ? task : t
                );
                localStorage.setItem("TaskDetails", JSON.stringify(updatedTasks));
                location.reload();
            });

            // Cancel logic
            cancelBtn.addEventListener("click", () => {
                location.reload();
            });
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "🗑️ Delete";

        deleteBtn.addEventListener("click", () => {
            const updatedTasks = tasks.filter(t => t.taskId !== task.taskId);

            const deletedTasks = JSON.parse(localStorage.getItem("DeletedTasks")) || [];
            const now = new Date().toISOString().split("T")[0]; 

            deletedTasks.push({ ...task, deletedOn: now, status: "Deleted" });
            localStorage.setItem("DeletedTasks", JSON.stringify(deletedTasks));
            localStorage.setItem("TaskDetails", JSON.stringify(updatedTasks));

            location.reload();
        });

        taskActions.appendChild(updateBtn);
        taskActions.appendChild(deleteBtn);

        taskCard.appendChild(taskInfo);
        taskCard.appendChild(taskActions);

        taskListContainer.appendChild(taskCard);
    });
});

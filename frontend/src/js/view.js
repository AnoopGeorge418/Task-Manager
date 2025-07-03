document.addEventListener("DOMContentLoaded", async () => {
  const taskListContainer = document.querySelector(".task_list_container");

  try {
    const response = await fetch("http://localhost:5000/api/tasks");
    const tasks = await response.json();

    if (!Array.isArray(tasks) || tasks.length === 0) {
      const noTaskMsg = document.createElement("p");
      noTaskMsg.textContent = "You have not added any tasks yet!";
      noTaskMsg.style.fontStyle = "italic";
      taskListContainer.appendChild(noTaskMsg);
      return;
    }

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
        taskInfo.innerHTML = "";

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = task.taskInfo;
        titleInput.classList.add("edit_title");

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

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "✅ Save";
        saveBtn.classList.add("save");

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "❌ Cancel";
        cancelBtn.classList.add("cancel");

        taskInfo.appendChild(titleInput);
        taskInfo.appendChild(statusSelect);
        taskInfo.appendChild(saveBtn);
        taskInfo.appendChild(cancelBtn);

        saveBtn.addEventListener("click", async () => {
          const updatedTitle = titleInput.value.trim();
          const updatedStatus = statusSelect.value;

          if (updatedTitle === "") {
            alert("Title can't be empty.");
            return;
          }

          try {
            await fetch(`http://localhost:5000/api/tasks/${task.taskId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ taskInfo: updatedTitle, status: updatedStatus })
            });
            location.reload();
          } catch (err) {
            alert("Failed to update task.");
          }
        });

        cancelBtn.addEventListener("click", () => {
          location.reload();
        });
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete");
      deleteBtn.textContent = "🗑️ Delete";

      deleteBtn.addEventListener("click", async () => {
        try {
          await fetch(`http://localhost:5000/api/tasks/${task.taskId}`, {
            method: "DELETE"
          });
          location.reload();
        } catch (err) {
          alert("Failed to delete task.");
        }
      });

      taskActions.appendChild(updateBtn);
      taskActions.appendChild(deleteBtn);

      taskCard.appendChild(taskInfo);
      taskCard.appendChild(taskActions);

      taskListContainer.appendChild(taskCard);
    });
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "⚠️ Failed to load tasks from the server.";
    errorMsg.style.color = "red";
    taskListContainer.appendChild(errorMsg);
  }
});

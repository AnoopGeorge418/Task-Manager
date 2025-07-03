document.addEventListener("DOMContentLoaded", async () => {
  const taskListContainer = document.querySelector(".task_list_container");

  try {
    const res = await fetch("http://localhost:5000/api/tasks/deleted");
    const deletedTasks = await res.json();

    if (!deletedTasks || deletedTasks.length === 0) {
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
      deletedOn.innerHTML = `<strong>Deleted on:</strong> ${new Date(task.deletedOn).toLocaleString()}`;

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
      restoreBtn.addEventListener("click", async () => {
        await fetch(`http://localhost:5000/api/tasks/restore/${task._id}`, {
          method: "POST"
        });
        location.reload();
      });

      // ❌ Permanent Delete Logic
      permDeleteBtn.addEventListener("click", async () => {
        await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
          method: "DELETE"
        });
        location.reload();
      });

      taskActions.appendChild(restoreBtn);
      taskActions.appendChild(permDeleteBtn);
      taskCard.appendChild(taskInfo);
      taskCard.appendChild(taskActions);

      taskListContainer.appendChild(taskCard);
    });
  } catch (err) {
    console.error("Failed to fetch deleted tasks:", err);
    const msg = document.createElement("p");
    msg.textContent = "⚠️ Could not load deleted tasks.";
    taskListContainer.appendChild(msg);
  }
});

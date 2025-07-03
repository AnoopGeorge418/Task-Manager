document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementsByClassName("addTaskBtn")[0];
  const viewTaskBtn = document.getElementsByClassName("viewTaskBtn")[0];
  const deletedTaskBtn = document.getElementsByClassName("deletedTaskBtn")[0];

  addTaskBtn.onclick = async () => {
    const taskInput = document.getElementById("taskLabel");
    const taskLabel = taskInput.value.trim();

    if (taskLabel === "") {
      alert("Please enter a task.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include token here later when auth is set up
        },
        body: JSON.stringify({
          taskInfo: taskLabel,
          status: "Pending",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Task added: "${taskLabel}"`);
        taskInput.value = "";
      } else {
        alert(`❌ Failed to add task: ${data.msg}`);
      }
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Server error while adding task");
    }
  };

  viewTaskBtn.onclick = () => {
    window.location.href = "./view.html";
  };

  deletedTaskBtn.onclick = () => {
    window.location.href = "./deleted.html";
  };
});

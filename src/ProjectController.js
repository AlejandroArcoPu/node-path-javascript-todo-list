export function ProjectController(data) {
  const setNumberOfProjectTasks = (project) => {
    const numberTask = document.querySelector(".number-task");
    numberTask.textContent = `${data.getProjectTasks(project)} ${
      data.getTodayTask().length > 1 ? "tasks" : "task"
    }`;
  };

  return { setNumberOfProjectTasks };
}

import { createDisablerButton, setButtonActive } from "../domUtils";
import { Task } from "../Task";

export function PageTodayController(data) {
  const setTodayDate = () => {
    const todayDate = document.querySelector(".today-date");
    todayDate.textContent = data.getToday();
  };

  const setNumberOfTasksToday = () => {
    const numberTask = document.querySelector(".number-task");
    numberTask.textContent = `${data.getTodayTask()} ${
      data.getTodayTask().length > 1 ? "tasks" : "task"
    }`;
  };

  const displayFormTaskMain = () => {
    document.querySelector(".main-add-task").classList.toggle("not-display");
    document
      .querySelector(".main-add-task-form")
      .classList.toggle("not-display");
  };

  const clickOnAddTaskInPage = () => {
    const addTaskButton = document.querySelector(".main-add-task");
    addTaskButton.addEventListener("click", displayFormTaskMain);
  };

  const clickOnCrossButton = () => {
    const addTaskCrossButton = document.querySelector(
      ".main-add-task-button-cross"
    );
    addTaskCrossButton.addEventListener("click", displayFormTaskMain);
  };

  const createTasksElements = () => {
    data.projects.forEach((p) => p.tasks.forEach((t) => createTaskElement(t)));
  };

  const createTaskElement = (task) => {
    const mainTasks = document.querySelector(".main-tasks");
    const taskDiv = document.createElement("div");
    taskDiv.classList = "task";
    taskDiv.textContent = task.title;
    mainTasks.appendChild(taskDiv);
    setNumberOfTasksToday();
    clickOnTaskElement(task, taskDiv);
  };

  const submitAddTaskForm = () => {
    const addTaskForm = document.querySelector(".main-add-task-form");
    const titleInput = document.querySelector(".title-input");
    const descriptionInput = document.querySelector(".description-input");
    const mainAddTaskSelect = document.querySelector(".select-main-add-task");

    addTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newTask = new Task(
        titleInput.value,
        descriptionInput.value,
        data.getToday(),
        mainAddTaskSelect.value,
        ""
      );
      data.addTask(newTask, "My Tasks");
      createTaskElement(newTask);
      titleInput.value = "";
      descriptionInput.value = "";
      mainAddTaskSelect.value = "";
      displayFormTaskMain();
    });
  };

  const clickOnTaskElement = (task, taskDiv) => {
    taskDiv.addEventListener("click", () => {
      const tasksDialog = document.querySelector(".task-dialog");
      const taskTitle = document.querySelector(".task-title");
      taskTitle.textContent = task.title;
      tasksDialog.showModal();
    });
  };

  const init = () => {
    setTodayDate();
    setButtonActive(".today-button");
    createDisablerButton(".main-add-task-button-send", ".title-input");
    setNumberOfTasksToday();
    createTasksElements();
    clickOnAddTaskInPage();
    clickOnCrossButton();
    submitAddTaskForm();
  };

  return { init };
}

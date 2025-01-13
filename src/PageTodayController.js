import { createDisablerButton, setButtonActive } from "./domUtils";
import { Task } from "./Task";
import { ProjectController } from "./ProjectController";

export function PageTodayController(data) {
  const project = ProjectController(data);

  const cleanAddTaskForm = () => {
    const titleInput = document.querySelector(".title-input");
    const descriptionInput = document.querySelector(".description-input");
    const prioritySelect = document.querySelector(".select-main-add-task");
    const dateSelect = document.querySelector(".date-main-add-task");

    titleInput.value = "";
    descriptionInput.value = "";
    prioritySelect.value = "";
    dateSelect.value = "";
  };

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
    cleanAddTaskForm();
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

  const createTodayTasksElements = () => {
    data.projects.forEach((p) =>
      p.tasks.forEach((t) => {
        if (t.date === data.getToday()) {
          console.log("aqui");
          createTaskElement(t, ".main-tasks-today");
        }
      })
    );
  };

  const createTaskElement = (task, place) => {
    const mainTasks = document.querySelector(place);
    const taskDiv = document.createElement("div");
    taskDiv.classList = "task";
    taskDiv.textContent = task.title;
    mainTasks.appendChild(taskDiv);
    clickOnTaskElement(task, taskDiv);
  };

  const submitAddTaskForm = () => {
    const addTaskForm = document.querySelector(".main-add-task-form");
    const titleInput = document.querySelector(".title-input");
    const descriptionInput = document.querySelector(".description-input");
    const prioritySelect = document.querySelector(".select-main-add-task");
    const dateSelect = document.querySelector(".date-main-add-task");

    addTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const typeOfForm = document.querySelector(".page-title").textContent;
      if (typeOfForm === "Today") {
        const newTask = new Task(
          titleInput.value,
          descriptionInput.value,
          data.getToday(),
          prioritySelect.value,
          ""
        );
        data.addTask(newTask, "My Tasks");
        setNumberOfTasksToday();
        createTaskElement(newTask, ".main-tasks-today");
      } else {
        const newTask = new Task(
          titleInput.value,
          descriptionInput.value,
          data.getFormattedDate(dateSelect.value),
          prioritySelect.value,
          ""
        );
        data.addTask(newTask, typeOfForm);
        project.setNumberOfProjectTasks(typeOfForm);
        createTaskElement(newTask, ".main-tasks-project");
      }

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
    createTodayTasksElements();
    clickOnAddTaskInPage();
    clickOnCrossButton();
    submitAddTaskForm();
  };

  return { init, setNumberOfTasksToday };
}

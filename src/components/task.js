import { cleanForm } from "../utils/domUtils";
import { Task } from "../objects/Task";

export function task(data) {
  const setNumberOfTasks = (type) => {
    const numberTask = document.querySelector(".number-task");
    numberTask.textContent = `${
      type === "today" ? data.getTodayTask() : data.getProjectTasks(type)
    } ${data.getTodayTask().length > 1 ? "tasks" : "task"}`;
  };

  const replaceForCleanTasksElements = (classOfTasks) => {
    const main = document.querySelector("main");
    const mainAddTaskButton = document.querySelector(".main-add-task");

    const mainTasks = document.querySelector(classOfTasks);
    mainTasks.remove();
    const newMainTasks = document.createElement("div");
    newMainTasks.classList = classOfTasks.replace(".", "");
    main.insertBefore(newMainTasks, mainAddTaskButton);
  };

  const createTaskElement = (task, mainClass) => {
    const mainTasks = document.querySelector(mainClass);
    const taskDiv = document.createElement("div");
    taskDiv.classList = "task";
    taskDiv.textContent = task.title;
    mainTasks.appendChild(taskDiv);
  };

  const createTasksElements = (type) => {
    if (type === "today") {
      replaceForCleanTasksElements(".main-tasks-today");
      data.projects.forEach((p) =>
        p.tasks.forEach((t) => {
          if (t.date === data.getToday()) {
            createTaskElement(t, ".main-tasks-today");
          }
        })
      );
    } else {
      replaceForCleanTasksElements(".main-tasks-project");
      data.projects.forEach((p) => {
        if (p.name === type) {
          return p.tasks.forEach((t) =>
            createTaskElement(t, ".main-tasks-project")
          );
        }
      });
    }
  };

  const displayFormTaskMain = (event) => {
    console.log("aqui", event.target);
    cleanForm(".main-add-task-form");
    document.querySelector(".main-add-task").classList.toggle("not-display");
    document
      .querySelector(".main-add-task-form")
      .classList.toggle("not-display");
  };

  const clickOnCrossButton = () => {
    const addTaskCrossButton = document.querySelector(
      ".main-add-task-button-cross"
    );
    addTaskCrossButton.addEventListener("click", displayFormTaskMain);
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
        setNumberOfTasks("today");
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
        setNumberOfTasks(typeOfForm);
        createTaskElement(newTask, ".main-tasks-project");
      }

      displayFormTaskMain();
    });
  };

  const clickOnAddTaskInPage = () => {
    const addTaskButton = document.querySelector(".main-add-task");
    addTaskButton.addEventListener("click", displayFormTaskMain);
    submitAddTaskForm();
    clickOnCrossButton();
  };

  const init = (type) => {
    createTasksElements(type), setNumberOfTasks(type), clickOnAddTaskInPage();
  };

  return { init, createTasksElements, setNumberOfTasks };
}

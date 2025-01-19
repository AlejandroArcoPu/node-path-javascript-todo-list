import {
  cleanForm,
  setNumberOfTaskInButton,
  dynamicallyIncreaseHeightTextArea,
  getRandomID,
} from "../utils/domUtils";
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
    taskDiv.classList = `task ${task.id}`;
    taskDiv.textContent = task.title;
    mainTasks.appendChild(taskDiv);
    taskDiv.addEventListener("click", showTask);
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
    cleanForm(".main-add-task-form");
    dynamicallyIncreaseHeightTextArea(".title-input");
    dynamicallyIncreaseHeightTextArea(".description-input");
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
          getRandomID(),
          titleInput.value,
          descriptionInput.value,
          data.getToday(),
          prioritySelect.value,
          ""
        );
        data.addTask(newTask, "My Tasks");
        setNumberOfTasks("today");
        setNumberOfTaskInButton(
          ".num-tasks-in-button.today",
          data.getTodayTask()
        );
        setNumberOfTaskInButton(
          ".num-tasks-in-button.MyTasks",
          data.getProjectTasks("My Tasks")
        );
        createTaskElement(newTask, ".main-tasks-today");
      } else {
        const newTask = new Task(
          getRandomID(),
          titleInput.value,
          descriptionInput.value,
          data.getFormattedDate(dateSelect.value),
          prioritySelect.value,
          ""
        );
        data.addTask(newTask, typeOfForm);
        setNumberOfTasks(typeOfForm);
        createTaskElement(newTask, ".main-tasks-project");
        setNumberOfTaskInButton(
          ".num-tasks-in-button.today",
          data.getTodayTask()
        );
        setNumberOfTaskInButton(
          `.num-tasks-in-button.${typeOfForm.replaceAll(" ", "")}`,
          data.getProjectTasks(typeOfForm)
        );
      }

      displayFormTaskMain();
    });
  };

  const showTask = (event) => {
    const taskId = event.currentTarget.classList[1];
    const task = data.getTaskById(taskId);
    const taskDialog = document.querySelector(".task-dialog");
    taskDialog.showModal();
    const taskDiv = document.querySelector(".task-div");
    taskDiv.classList.add(taskId);
    const breadcrumb = document.querySelector(".breadcrumb");
    let breadcrumbText = "";
    if (breadcrumb.classList.length === 1) {
      breadcrumbText = breadcrumb.textContent;
    }
    const taskParent = document.querySelector(".task-parent");
    taskParent.textContent = `${breadcrumbText} ${
      document.querySelector(".page-title").textContent
    } /`;
    const taskTitle = document.querySelector(".task-title");
    taskTitle.textContent = task.title;
    const taskDescription = document.querySelector(".task-description");
    taskDescription.textContent = task.description
      ? task.description
      : "Description";
    const taskPriority = document.querySelector(".task-priority-value");
    taskPriority.textContent = task.priority.toUpperCase();
    const taskDate = document.querySelector(".task-date");
    taskDate.textContent = task.date;

    const taskDialogMark = document.querySelector(".task-dialog-mark");
    taskDialogMark.addEventListener("click", closeTask);

    const taskDialogTrash = document.querySelector(".task-dialog-trash");
    taskDialogTrash.addEventListener("click", removeTask);
  };

  const closeTask = () => {
    const taskDialog = document.querySelector(".task-dialog");
    const taskDiv = document.querySelector(".task-div");
    const taskDialogMark = document.querySelector(".task-dialog-mark");
    const taskDialogTrash = document.querySelector(".task-dialog-trash");
    taskDialogMark.removeEventListener("click", closeTask);
    taskDialogTrash.removeEventListener("click", removeTask);
    taskDiv.classList.remove(taskDiv.classList[1]);
    taskDialog.close();
  };

  const removeTask = (event) => {
    const parentText =
      event.currentTarget.parentNode.parentNode.querySelector(
        ".task-parent"
      ).textContent;
    let projectName = "";
    if (parentText.includes("Today")) {
      projectName = "My Tasks";
    } else {
      const words = parentText.split("/");
      projectName = words[1].trim();
    }

    const taskId =
      event.currentTarget.parentNode.parentNode.parentNode.classList[1];
    data.removeTask(taskId, projectName);

    const taskInDiv = document.querySelector(`.task.${taskId}`);
    taskInDiv.remove();
    setNumberOfTasks(projectName === "My Tasks" ? "today" : projectName);
    setNumberOfTaskInButton(".num-tasks-in-button.today", data.getTodayTask());
    setNumberOfTaskInButton(
      `.num-tasks-in-button.${projectName.replaceAll(" ", "")}`,
      data.getProjectTasks(projectName)
    );

    closeTask();
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

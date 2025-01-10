import { createDisablerButton } from "../domUtils";
export function PageTodayController(data) {
  const setTodayButtonActive = () => {
    const todayButton = document.querySelector(".today-button");
    todayButton.classList.toggle("active");
    createDisablerButton(".main-add-task-button-send", ".title-input");
  };
  const setTodayDate = () => {
    const todayDate = document.querySelector(".today-date");
    todayDate.textContent = data.getToday();
  };
  const setNumberOfTasksToday = () => {
    const numberTask = document.querySelector(".number-task");
    numberTask.textContent = `${data.getTodayTask().length} ${
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

  const submitAddTaskForm = () => {
    const addTaskForm = document.querySelector(".main-add-task-form");
    const titleInput = document.querySelector(".title-input");
    const descriptionInput = document.querySelector(".description-input");
    const mainAddTaskSelect = document.querySelector(".select-main-add-task");
    const mainAddTaskDate = document.querySelector(".date-main-add-task");

    addTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      data.addTask(
        titleInput.value,
        descriptionInput.value,
        mainAddTaskSelect.value,
        mainAddTaskDate.value,
        "",
        "My Tasks"
      );
      titleInput.value = "";
      descriptionInput.value = "";
      mainAddTaskSelect.value = "";
      mainAddTaskDate.value = "";
      displayFormTaskMain();
    });
  };

  const init = () => {
    setTodayDate();
    setTodayButtonActive();
    setNumberOfTasksToday();
    clickOnAddTaskInPage();
    clickOnCrossButton();
    submitAddTaskForm();
  };

  return { init };
}

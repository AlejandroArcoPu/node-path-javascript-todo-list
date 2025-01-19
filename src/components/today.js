import {
  setButtonActive,
  createDisablerButton,
  setNumberOfTaskInButton,
} from "../utils/domUtils";
import { task } from "./task";
export function today(data) {
  const taskComponent = task(data);
  const setTodayDate = () => {
    const todayDate = document.querySelector(".today-date");
    todayDate.textContent = data.getToday();
  };

  const addListenerTodayButton = () => {
    const todayButton = document.querySelector(".today-button");
    todayButton.addEventListener("click", () => {
      setButtonActive(".today-button");
      const breadCrumbProject = document.querySelector(".breadcrumb");
      breadCrumbProject.classList.add("not-display");
      const pageTitle = document.querySelector(".page-title");
      pageTitle.textContent = "Today";
      const todayDate = document.querySelector(".today-date");
      todayDate.classList.remove("not-display");
      const dateSelect = document.querySelector(".date-main-add-task");
      dateSelect.classList.add("not-display");
      dateSelect.required = false;
      const mainTaskProjectDiv = document.querySelector(".main-tasks-project");
      mainTaskProjectDiv.classList.add("not-display");
      const mainTaskTodayDiv = document.querySelector(".main-tasks-today");
      mainTaskTodayDiv.classList.remove("not-display");
      taskComponent.setNumberOfTasks("today");
      taskComponent.createTasksElements("today");
    });
  };

  const init = () => {
    setTodayDate();
    addListenerTodayButton();
    setButtonActive(".today-button");
    createDisablerButton(".main-add-task-button-send", ".title-input");
    setNumberOfTaskInButton(".num-tasks-in-button.today", data.getTodayTask());
  };

  return { setTodayDate, init, addListenerTodayButton };
}

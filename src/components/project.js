import { setButtonActive } from "../utils/domUtils";
import { task } from "./task";

export function project(data) {
  const taskComponent = task(data);

  const displayCreateProjectDialog = () => {
    const addProjectButton = document.querySelector(".add-project-icon");
    const projectCreationDialog = document.querySelector(
      ".project-creation-dialog"
    );
    addProjectButton.addEventListener("click", () => {
      projectCreationDialog.showModal();
    });
  };

  const showProjectElements = () => {
    data.projects.forEach((project) => {
      showProjectElement(project.name, project.color);
    });
  };
  const showProjectElement = (projectName, projectColor) => {
    const myProjectsMenu = document.querySelector(".myprojects-menu");
    const projectLi = document.createElement("li");

    const projectLabel = document.createElement("button");
    projectLabel.textContent = projectName;
    projectLabel.classList = `myprojects-element ${projectName.replace(
      " ",
      ""
    )}`;

    const projectSpan = document.createElement("span");
    projectSpan.classList = `color ${projectColor}`;

    projectLabel.prepend(projectSpan);

    projectLi.appendChild(projectLabel);
    myProjectsMenu.appendChild(projectLi);

    projectLi.addEventListener("click", () => {
      setButtonActive(`.${projectName.replace(" ", "")}`);
      const breadCrumbProject = document.querySelector(".breadcrumb");
      breadCrumbProject.classList.remove("not-display");
      const pageTitle = document.querySelector(".page-title");
      pageTitle.textContent = projectName;
      const todayDate = document.querySelector(".today-date");
      todayDate.classList.add("not-display");
      const dateSelect = document.querySelector(".date-main-add-task");
      dateSelect.classList.remove("not-display");
      const numberTasks = document.querySelector(".number-task");
      numberTasks.textContent = `${data.getProjectTasks(projectName)} ${
        data.getTodayTask().length > 1 ? "tasks" : "task"
      }`;
      const mainTaskProjectDiv = document.querySelector(".main-tasks-project");
      mainTaskProjectDiv.classList.remove("not-display");

      const mainTaskTodayDiv = document.querySelector(".main-tasks-today");
      mainTaskTodayDiv.classList.add("not-display");
      taskComponent.createTasksElements(projectName);
      taskComponent.setNumberOfTasks(projectName);
    });
  };

  const init = () => {
    showProjectElements();
    displayCreateProjectDialog();
  };

  return { init };
}

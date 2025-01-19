import {
  setButtonActive,
  createCounterInput,
  createDisablerButton,
  cleanForm,
  dynamicallyIncreaseHeightTextArea,
} from "../utils/domUtils";
import { task } from "./task";
import trash from "../images/trash.svg";

export function project(data) {
  const taskComponent = task(data);

  const closeCreateProjectDialog = () => {
    const cancelProjectButton = document.querySelector(
      ".cancel-project-button"
    );
    const projectCreationDialog = document.querySelector(
      ".project-creation-dialog"
    );
    cancelProjectButton.addEventListener("click", (event) => {
      event.preventDefault();
      cleanForm(".project-creation-form");
      projectCreationDialog.close();
    });
  };

  const displayCreateProjectDialog = () => {
    const addProjectButton = document.querySelector(".add-project-icon");
    const projectCreationDialog = document.querySelector(
      ".project-creation-dialog"
    );
    addProjectButton.addEventListener("click", () => {
      createCounterInput(".project-input", ".project-input-count", 20);
      createDisablerButton(".done-project-button", ".project-input");
      projectCreationDialog.showModal();
      createNewProject();
      closeCreateProjectDialog();
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
    const projectNameAndSpanDiv = document.createElement("div");
    projectNameAndSpanDiv.textContent = projectName;
    const numberTasksButtonDiv = document.createElement("div");
    const numberTasksSpan = document.createElement("span");
    numberTasksSpan.textContent = data.getProjectTasks(projectName);
    numberTasksSpan.classList = `${projectName.replaceAll(
      " ",
      ""
    )} num-tasks-in-button`;
    const projectLabel = document.createElement("button");
    projectLabel.classList = `myprojects-element ${projectName.replaceAll(
      " ",
      ""
    )}`;

    const projectSpan = document.createElement("span");
    projectSpan.classList = `color ${projectColor}`;

    const trashButton = document.createElement("button");
    trashButton.classList = `${projectName.replaceAll(
      " ",
      ""
    )} trash-button not-display`;
    const trashImg = document.createElement("img");
    trashImg.src = trash;
    trashButton.appendChild(trashImg);
    numberTasksButtonDiv.appendChild(numberTasksSpan);
    numberTasksButtonDiv.appendChild(trashButton);

    projectNameAndSpanDiv.prepend(projectSpan);

    projectLabel.appendChild(projectNameAndSpanDiv);
    projectLabel.appendChild(numberTasksButtonDiv);

    projectLi.appendChild(projectLabel);
    myProjectsMenu.appendChild(projectLi);

    projectLi.addEventListener("click", () => {
      setButtonActive(`.${projectName.replaceAll(" ", "")}`);
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

    projectLi.addEventListener("mouseenter", () => {
      trashButton.classList.remove("not-display");
      numberTasksSpan.classList.add("not-display");
    });

    projectLi.addEventListener("mouseleave", () => {
      trashButton.classList.add("not-display");
      numberTasksSpan.classList.remove("not-display");
    });
  };

  const createNewProject = () => {
    const projectCreationForm = document.querySelector(
      ".project-creation-form"
    );
    const createProject = (event) => {
      event.preventDefault();
      const projectCreationDialog = document.querySelector(
        ".project-creation-dialog"
      );
      const projectInput = document.querySelector(".project-input");
      const colorsSelect = document.querySelector(".colors-select");
      data.addProject(projectInput.value, colorsSelect.value);
      showProjectElement(projectInput.value, colorsSelect.value);

      cleanForm(".project-creation-form");
      projectCreationDialog.close();
    };
    projectCreationForm.addEventListener("submit", createProject);
  };

  const init = () => {
    showProjectElements();
    displayCreateProjectDialog();
  };

  return { init, showProjectElement };
}

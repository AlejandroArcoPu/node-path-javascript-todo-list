import {
  setButtonActive,
  createCounterInput,
  createDisablerButton,
  cleanForm,
} from "../utils/domUtils";
import { task } from "./task";
import trash from "../images/trash.svg";
export function project(data) {
  const taskComponent = task(data);

  const closeCreateProjectDialog = (event) => {
    event.preventDefault();
    const projectCreationDialog = document.querySelector(
      ".project-creation-dialog"
    );
    const projectCreationForm = document.querySelector(
      ".project-creation-form"
    );
    const cancelProjectButton = document.querySelector(
      ".cancel-project-button"
    );
    cleanForm(".project-creation-form");
    projectCreationDialog.close();
    cancelProjectButton.removeEventListener("click", closeCreateProjectDialog);
    projectCreationForm.removeEventListener("submit", createProject);
  };

  const displayCreateProjectDialog = () => {
    const addProjectButton = document.querySelector(".add-project-icon");
    const projectCreationDialog = document.querySelector(
      ".project-creation-dialog"
    );
    const cancelProjectButton = document.querySelector(
      ".cancel-project-button"
    );
    const projectCreationForm = document.querySelector(
      ".project-creation-form"
    );
    addProjectButton.addEventListener("click", () => {
      createCounterInput(".project-input", ".project-input-count", 20);
      createDisablerButton(".done-project-button", ".project-input");
      projectCreationDialog.showModal();
      projectCreationForm.addEventListener("submit", createProject);
      cancelProjectButton.addEventListener("click", closeCreateProjectDialog);
    });
  };

  const createProjectElements = () => {
    data.projects.forEach((project) => {
      createProjectElement(project.name, project.color);
    });
  };
  const createProjectElement = (projectName, projectColor) => {
    const myProjectsMenu = document.querySelector(".myprojects-menu");
    const projectLi = document.createElement("li");
    projectLi.classList = `li-element ${projectName.replaceAll(" ", "")}`;
    const projectNameAndSpanDiv = document.createElement("div");
    projectNameAndSpanDiv.textContent = projectName;
    projectNameAndSpanDiv.classList = "project-name";
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

    projectLi.addEventListener("click", showProjectElement);

    if (projectName !== "My Tasks") {
      projectLi.addEventListener("mouseenter", () => {
        trashButton.classList.remove("not-display");
        numberTasksSpan.classList.add("not-display");
        trashButton.addEventListener("click", removeProject);
      });

      projectLi.addEventListener("mouseleave", () => {
        trashButton.classList.add("not-display");
        numberTasksSpan.classList.remove("not-display");
      });
    }
  };

  const showProjectElement = (event) => {
    const projectName =
      event.currentTarget.querySelector(".project-name").textContent;
    setButtonActive(`.myprojects-element.${projectName.replaceAll(" ", "")}`);
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
  };

  const removeProject = (event) => {
    if (confirm("Remove the project and its tasks!?")) {
      const projectName =
        event.currentTarget.parentNode.parentNode.firstChild.textContent;
      const projectElementLi = document.querySelector(
        `.li-element.${projectName.replaceAll(" ", "")}`
      );
      projectElementLi.removeEventListener("click", showProjectElement);
      const todayButton = document.querySelector(".today-button");
      todayButton.click();
      data.removeProject(projectName);
      projectElementLi.remove();
    }
  };

  const createProject = (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const projectCreationDialog = document.querySelector(
      ".project-creation-dialog"
    );
    const projectInput = document.querySelector(".project-input");
    const colorsSelect = document.querySelector(".colors-select");
    data.addProject(projectInput.value, colorsSelect.value);
    createProjectElement(projectInput.value, colorsSelect.value);

    cleanForm(".project-creation-form");
    projectCreationDialog.close();
  };

  const init = () => {
    createProjectElements();
    displayCreateProjectDialog();
  };

  return { init, createProjectElement };
}

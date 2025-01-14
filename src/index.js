import "./styles.css";
import { User } from "./User";
import { DataManager } from "./objects/DataManager";
import { PageTodayController } from "./PageTodayController";
import { ProjectController } from "./ProjectPageController";
import { indexUtils } from "./utils/indexUtils";
import {
  createDisablerButton,
  createCounterInput,
  setButtonActive,
} from "./utils/domUtils";
import { user } from "./components/user";

function ScreenController() {
  const userStorage = localStorage.getItem("DataManagerEasyTasks")
    ? JSON.parse(localStorage.getItem("DataManagerEasyTasks")).user
    : new User("User");
  const myProjects = localStorage.getItem("DataManagerEasyTasks")
    ? JSON.parse(localStorage.getItem("DataManagerEasyTasks")).projects
    : [];

  const data = new DataManager(myProjects, userStorage);
  const project = ProjectController(data);
  const indexUtil = indexUtils();
  indexUtil.init();

  const userComponent = user(data);
  userComponent.init();

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
      dateSelect.required = true;
      const numberTasks = document.querySelector(".number-task");
      numberTasks.textContent = `${data.getProjectTasks(projectName)} ${
        data.getTodayTask().length > 1 ? "tasks" : "task"
      }`;
      const mainTaskProjectDiv = document.querySelector(".main-tasks-project");
      mainTaskProjectDiv.classList.remove("not-display");

      const mainTaskTodayDiv = document.querySelector(".main-tasks-today");
      mainTaskTodayDiv.classList.add("not-display");
      project.createTasksElements(projectName);
    });
  };

  const createNewProject = () => {
    const projectCreationDialog = document.querySelector(
      ".project-creation-dialog"
    );
    const projectCreationForm = document.querySelector(
      ".project-creation-form"
    );
    const createProject = (event) => {
      event.preventDefault();
      const projectInput = document.querySelector(".project-input");
      const colorsSelect = document.querySelector(".colors-select");

      data.addProject(projectInput.value, colorsSelect.value);
      showProjectElement(projectInput.value, colorsSelect.value);

      projectInput.value = "";

      projectCreationDialog.close();
    };
    projectCreationForm.addEventListener("submit", createProject);
  };

  const createProjectDialog = () => {
    const createArrowDisplayProjects = () => {
      const arrowDown = document.querySelector(".arrow-down");
      arrowDown.addEventListener("click", () => {
        arrowDown.classList.toggle("not-display");
        document
          .querySelectorAll(".myprojects-element")
          .forEach((element) => element.classList.toggle("not-display"));
      });
    };

    const displayCreateProjectDialog = () => {
      const addProjectButton = document.querySelector(".add-project-icon");
      const projectCreationDialog = document.querySelector(
        ".project-creation-dialog"
      );
      addProjectButton.addEventListener("click", () => {
        projectCreationDialog.showModal();
      });
    };

    const closeCreateProjectDialog = () => {
      const cancelProjectButton = document.querySelector(
        ".cancel-project-button"
      );
      const projectCreationDialog = document.querySelector(
        ".project-creation-dialog"
      );
      cancelProjectButton.addEventListener("click", (event) => {
        event.preventDefault();
        projectCreationDialog.close();
      });
    };

    closeCreateProjectDialog();
    createCounterInput(".project-input", ".project-input-count", 20);
    createDisablerButton(".done-project-button", ".project-input");
    displayCreateProjectDialog();
    createArrowDisplayProjects();
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

      todayPage.setNumberOfTasksToday();
    });
  };

  createNewProject();
  showProjectElements();
  createProjectDialog();
  addListenerTodayButton();

  const todayPage = PageTodayController(data);
  todayPage.init();
}
ScreenController();

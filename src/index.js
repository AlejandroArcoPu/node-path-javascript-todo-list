import "./styles.css";
import { User } from "./User";
import { DataManager } from "./DataManager";
import { PageTodayController } from "./images/PageTodayController";
import {
  createDisablerButton,
  createCounterInput,
  setButtonActive,
} from "./domUtils";

function ScreenController() {
  const user = localStorage.getItem("DataManagerEasyTasks")
    ? JSON.parse(localStorage.getItem("DataManagerEasyTasks")).user
    : new User("User");
  const myProjects = localStorage.getItem("DataManagerEasyTasks")
    ? JSON.parse(localStorage.getItem("DataManagerEasyTasks")).projects
    : [];

  const data = new DataManager(myProjects, user);

  const createLateralMenuAlternating = () => {
    const arrowLeftButton = document.querySelector(".arrow-left-button");
    const toggleLateralMenu = () => {
      document.querySelector(".lateral-menu").classList.toggle("closed");
      document.querySelector(".arrow-left-button").classList.toggle("rotate");
      document.querySelector(".breadcrumb").classList.toggle("closed");
    };
    arrowLeftButton.addEventListener("click", toggleLateralMenu);
  };

  const setUserName = () => {
    const userName = document.querySelector(".user-name");
    userName.textContent = data.user.name;
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
      PageProject;
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

  const displayUserNameDialog = () => {
    if (!localStorage.getItem("DataManagerEasyTasks")) {
      const nameDialog = document.querySelector(".name-dialog");
      const nameForm = document.querySelector(".name-form");
      const nameInput = document.querySelector(".name-input");

      const updateUserName = (event) => {
        event.preventDefault();
        data.addUser(nameInput.value);
        setUserName();
        showProjectElement("My Tasks", "red");
        nameDialog.close();
      };

      nameForm.addEventListener("submit", updateUserName);
      createDisablerButton(".name-submit", ".name-input");
      nameDialog.showModal();
    }
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
    });
  };

  createNewProject();
  showProjectElements();
  displayUserNameDialog();
  setUserName();
  createProjectDialog();
  createLateralMenuAlternating();
  addListenerTodayButton();

  const todayPage = PageTodayController(data);
  todayPage.init();
}
ScreenController();

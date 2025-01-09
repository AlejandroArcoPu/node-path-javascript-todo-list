import "./styles.css";
import { User } from "./User";
import { DataManager } from "./DataManager";

function ScreenController() {
  const projectColors = [
    "🔴 Red",
    "🔵 Blue",
    "🟡 Yellow",
    "🟠 Orange",
    "🟣 Purple",
  ];
  const user = localStorage.getItem("userNameEasyTasks")
    ? JSON.parse(localStorage.getItem("userNameEasyTasks"))
    : new User("User");

  const myTasks = localStorage.getItem("tasksEasyTasks")
    ? localStorage.getItem("tasksEasyTasks")
    : [];
  const myProjects = localStorage.getItem("projectsEasyTasks")
    ? JSON.parse(localStorage.getItem("projectsEasyTasks"))
    : [];
  const data = new DataManager(myProjects, myTasks, user);

  const createLateralMenuAlternating = () => {
    const arrowLeftButton = document.querySelector(".arrow-left-button");
    const toggleLateralMenu = () => {
      document.querySelector(".lateral-menu").classList.toggle("closed");
      document.querySelector(".arrow-left-button").classList.toggle("rotate");
    };
    arrowLeftButton.addEventListener("click", toggleLateralMenu);
  };

  const createDisablerButton = (buttonClass, inputClass) => {
    const button = document.querySelector(buttonClass);
    const input = document.querySelector(inputClass);

    input.addEventListener("input", () => {
      if (input.value.length > 2) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });
  };

  const createCounterInput = (inputClass, showClass, limit) => {
    const input = document.querySelector(inputClass);
    const text = document.querySelector(showClass);
    input.addEventListener("input", (event) => {
      text.textContent = `${event.target.value.length}/${limit}`;
    });
  };

  const displayUserNameDialog = () => {
    if (!localStorage.getItem("userNameEasyTasks")) {
      const nameDialog = document.querySelector(".name-dialog");
      const nameForm = document.querySelector(".name-form");
      const nameInput = document.querySelector(".name-input");

      const updateUserName = (event) => {
        event.preventDefault();
        data.addUser(nameInput.value);
        showUserName();
        nameDialog.close();
      };

      nameForm.addEventListener("submit", updateUserName);

      createDisablerButton(".name-submit", ".name-input");
      nameDialog.showModal();
    }
  };

  const setUserName = () => {
    const userName = document.querySelector(".user-name");
    userName.textContent = data.user.name;
  };

  const setProjects = () => {
    const showProjectElements = () => {
      data.projects.forEach((project) => {
        showProjectElement(project.name, project.color);
      });
    };
    const showProjectElement = (projectName, projectColor) => {
      const myProjectsMenu = document.querySelector(".myprojects-menu");
      const projectLi = document.createElement("li");
      projectLi.classList = "myprojects-element";

      const projectLabel = document.createElement("label");
      projectLabel.textContent = projectName;
      projectLabel.classList = "myprojects-label";

      const projectSpan = document.createElement("span");
      projectSpan.classList = projectColor;

      const projectInput = document.createElement("input");
      projectInput.type = "checkbox";
      projectInput.name = `${projectName.replace(" ", "")}`;
      projectInput.id = `${projectName.replace(" ", "")}`;

      projectLabel.prepend(projectSpan);
      projectLabel.prepend(projectInput);

      projectLi.appendChild(projectLabel);
      myProjectsMenu.appendChild(projectLi);
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

        data.addProject(
          projectInput.value,
          colorsSelect.value.replace(/[^a-z]/gi, "").toLowerCase()
        );
        showProjectElement(
          projectInput.value,
          colorsSelect.value.replace(/[^a-z]/gi, "").toLowerCase()
        );

        projectInput.value = "";

        projectCreationDialog.close();
      };
      projectCreationForm.addEventListener("submit", createProject);
    };

    createNewProject();
    showProjectElements();
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

    const createSelectColors = () => {
      const colorsSelect = document.querySelector(".colors-select");
      projectColors.forEach((color) => {
        const option = document.createElement("option");
        option.textContent = `${color}`;
        option.value = color;
        colorsSelect.appendChild(option);
      });
    };

    closeCreateProjectDialog();
    createCounterInput(".project-input", ".project-input-count", 20);
    createDisablerButton(".done-project-button", ".project-input");

    displayCreateProjectDialog();
    createArrowDisplayProjects();
    createSelectColors();
  };

  setUserName();
  setProjects();
  createProjectDialog();
  displayUserNameDialog();
  createLateralMenuAlternating();
}

ScreenController();

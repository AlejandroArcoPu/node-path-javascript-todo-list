import "./styles.css";
import { User } from "./User";
import { DataManager } from "./DataManager";
import { Project } from "./Project";
import { Task } from "./Task";

function ScreenController() {
  const projectColors = ["red", "blue", "yellow", "orange", "purple"];
  const user = new User(localStorage.getItem("userNameEasyTasks"));
  const data = new DataManager();

  data.addProject(new Project("Prueba", "blue"));
  const showLateralMenu = () => {
    const arrowLeftButton = document.querySelector(".arrow-left-button");
    const toggleLateralMenu = () => {
      document.querySelector(".lateral-menu").classList.toggle("closed");
      document.querySelector(".arrow-left-button").classList.toggle("rotate");
    };
    arrowLeftButton.addEventListener("click", toggleLateralMenu);
  };

  const showNameDialog = () => {
    if (!localStorage.getItem("userNameEasyTasks")) {
      const nameDialog = document.querySelector(".name-dialog");
      const nameForm = document.querySelector(".name-form");
      const nameInput = document.querySelector(".name-input");

      const toggleInputDisable = () => {
        const nameSubmit = document.querySelector(".name-submit");
        nameInput.addEventListener("input", () => {
          if (nameInput.value.length > 2) {
            nameSubmit.disabled = false;
          } else {
            nameSubmit.disabled = true;
          }
        });
      };

      const updateName = (event) => {
        event.preventDefault();
        localStorage.setItem("userNameEasyTasks", nameInput.value);
        user.name = nameInput.value;
        showUserName();
        nameDialog.close();
      };

      nameForm.addEventListener("submit", updateName);

      toggleInputDisable();
      nameDialog.showModal();
    }
  };

  const showUserName = () => {
    const userName = document.querySelector(".user-name");
    userName.textContent = user.name;
  };

  const showProjects = () => {
    const myProjectsMenu = document.querySelector(".myprojects-menu");
    data.projects.forEach((project) => {
      const projectLi = document.createElement("li");

      const projectLabel = document.createElement("label");
      projectLabel.textContent = project.name;
      projectLabel.classList = "myprojects-elements";

      const projectSpan = document.createElement("span");

      const projectInput = document.createElement("input");
      projectInput.type = "checkbox";
      projectInput.name = `${project.name.replace(" ", "")}`;
      projectInput.id = `${project.name.replace(" ", "")}`;

      projectLabel.prepend(projectSpan);
      projectLabel.prepend(projectInput);

      projectLi.appendChild(projectLabel);
      myProjectsMenu.appendChild(projectLi);
    });
  };

  showProjects();
  showUserName();
  showNameDialog();
  showLateralMenu();
}

ScreenController();

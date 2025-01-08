import "./styles.css";
import { User } from "./User";
import { DataManager } from "./DataManager";

function ScreenController() {
  const user = new User(localStorage.getItem("userNameEasyTasks"));
  const data = new DataManager();

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

  showUserName();
  showNameDialog();
  showLateralMenu();
}

ScreenController();

import { createDisablerButton } from "../utils/domUtils";
import { project } from "./project";
export function user(data) {
  const projectComponent = project(data);

  const setUserName = () => {
    const userName = document.querySelector(".user-name");
    userName.textContent = data.user.name;
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
        projectComponent.createProjectElement("My Tasks", "red");
        nameDialog.close();
      };

      nameForm.addEventListener("submit", updateUserName);
      createDisablerButton(".name-submit", ".name-input");
      nameDialog.showModal();
    }
  };

  const init = () => {
    setUserName();
    displayUserNameDialog();
  };

  return { init };
}

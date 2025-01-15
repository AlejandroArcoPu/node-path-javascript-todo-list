import { setButtonActive, createDisablerButton } from "../utils/domUtils";
export function today(data) {
  const setTodayDate = () => {
    const todayDate = document.querySelector(".today-date");
    todayDate.textContent = data.getToday();
  };

  const init = () => {
    setTodayDate();
    setButtonActive(".today-button");
    createDisablerButton(".main-add-task-button-send", ".title-input");
  };

  return { setTodayDate, init };
}

export const createDisablerButton = (buttonClass, inputClass) => {
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

export const setButtonActive = (buttonClass) => {
  console.log(buttonClass);
  removeActiveButton();
  const button = document.querySelector(buttonClass);
  button.classList.add("active");
};

export const removeActiveButton = () => {
  if (document.querySelector(".active")) {
    console.log("first");
    const alreadyActiveButton = document.querySelector(".active");
    alreadyActiveButton.classList.toggle("active");
  }
};

export const createCounterInput = (inputClass, showClass, limit) => {
  const input = document.querySelector(inputClass);
  const text = document.querySelector(showClass);
  input.addEventListener("input", (event) => {
    text.textContent = `${event.target.value.length}/${limit}`;
  });
};

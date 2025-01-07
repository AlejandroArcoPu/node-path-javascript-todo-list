import "./styles.css";
function ScreenController() {
  const arrowLeftButton = document.querySelector(".arrow-left-button");
  function closeLateralMenu() {
    const lateralMenu = document.querySelector(".lateral-menu");
  }
  arrowLeftButton.addEventListener("click", closeLateralBar);
}

ScreenController();

import "./styles.css";
function ScreenController() {
  const arrowLeftButton = document.querySelector(".arrow-left-button");
  function closeLateralMenu() {
    document.querySelector(".lateral-menu").classList.toggle("closed");
    document.querySelector(".arrow-left-button").classList.toggle("rotate");
  }
  arrowLeftButton.addEventListener("click", closeLateralMenu);
}

ScreenController();

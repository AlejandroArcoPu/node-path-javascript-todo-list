import "./styles.css";
function ScreenController() {
  const showLateralMenu = () => {
    const arrowLeftButton = document.querySelector(".arrow-left-button");

    function toggleLateralMenu() {
      document.querySelector(".lateral-menu").classList.toggle("closed");
      document.querySelector(".arrow-left-button").classList.toggle("rotate");
    }
    arrowLeftButton.addEventListener("click", toggleLateralMenu);
  };
  const showNameDialog = () => {
    const 
  };
  showNameDialog();
  showLateralMenu();
}

ScreenController();

export function indexUtils() {
  const createLateralMenuToggling = () => {
    const arrowLeftButton = document.querySelector(".arrow-left-button");
    const toggleLateralMenu = () => {
      document.querySelector(".lateral-menu").classList.toggle("closed");
      document.querySelector(".arrow-left-button").classList.toggle("rotate");
      document.querySelector(".breadcrumb").classList.toggle("closed");
    };
    arrowLeftButton.addEventListener("click", toggleLateralMenu);
  };

  const init = () => {
    createLateralMenuToggling();
  };

  return { init };
}

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

  const createArrowDisplayProjects = () => {
    const arrowDown = document.querySelector(".arrow-down");
    arrowDown.addEventListener("click", () => {
      arrowDown.classList.toggle("not-display");
      document
        .querySelectorAll(".myprojects-element")
        .forEach((element) => element.classList.toggle("not-display"));
    });
  };

  const init = () => {
    createLateralMenuToggling();
    createArrowDisplayProjects();
  };

  return { init };
}

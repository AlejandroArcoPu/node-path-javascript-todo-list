import "./styles.css";
import { User } from "./User";
import { DataManager } from "./objects/DataManager";
import { indexUtils } from "./utils/indexUtils";
import { user } from "./components/user";
import { project } from "./components/project";
import { task } from "./components/task";
import { today } from "./components/today";

function ScreenController() {
  const userStorage = localStorage.getItem("DataManagerEasyTasks")
    ? JSON.parse(localStorage.getItem("DataManagerEasyTasks")).user
    : new User("User");
  const myProjects = localStorage.getItem("DataManagerEasyTasks")
    ? JSON.parse(localStorage.getItem("DataManagerEasyTasks")).projects
    : [];

  const data = new DataManager(myProjects, userStorage);
  const projectComponent = project(data);
  projectComponent.init(data);
  const indexUtil = indexUtils();
  indexUtil.init();
  const userComponent = user(data);
  userComponent.init();
  const todayComponent = today(data);
  todayComponent.init();
  const taskComponent = task(data);
  taskComponent.init("today");
}
ScreenController();

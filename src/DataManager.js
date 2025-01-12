import { Project } from "./Project";
import { Task } from "./Task";
import { User } from "./User";

export class DataManager {
  constructor(projects, user) {
    this.projects = projects;
    this.user = user;
  }

  addProject(project, color) {
    if (!this.projects.find((p) => p.name === project)) {
      const newProject = new Project(project, color, []);
      this.projects.push(newProject);
      const newDataManager = new DataManager(this.projects, this.user);
      localStorage.setItem(
        "DataManagerEasyTasks",
        JSON.stringify(newDataManager)
      );
    }
  }

  // addProject(project, color) {
  //   const newProject = new Project(project, color, []);
  //   this.projects.push(newProject);
  //   const newDataManager = new DataManager(this.projects, this.user);
  //   localStorage.setItem(
  //     "DataManagerEasyTasks",
  //     JSON.stringify(newDataManager)
  //   );
  // }

  addUser(user) {
    this.user = new User(user);
    this.projects = [new Project("My Tasks", "red", [])];
    const newDataManager = new DataManager(this.projects, this.user);
    localStorage.setItem(
      "DataManagerEasyTasks",
      JSON.stringify(newDataManager)
    );
  }

  // removeProject(project) {
  //   this.projects = this.projects.filter((p) => project.name !== p.name);
  //   localStorage.setItem("projectsEasyTasks", JSON.stringify(this.projects));
  // }

  // addTask(newTask) {
  //   this.tasks.push(newTask);
  //   localStorage.setItem("tasksEasyTasks", JSON.stringify(this.tasks));
  // }

  addTask(newTask, project) {
    const projectToModify = this.projects.find((p) => p.name === project);
    projectToModify.tasks.push(newTask);
    this.projects = this.projects.map((p) =>
      p.name === project ? projectToModify : p
    );
    const newDataManager = new DataManager(this.projects, this.user);
    localStorage.setItem(
      "DataManagerEasyTasks",
      JSON.stringify(newDataManager)
    );
  }

  // removeTask(task) {
  //   this.tasks = this.tasks.filter((t) => task.name !== t.name);
  //   localStorage.setItem("tasksEasyTasks", JSON.stringify(this.tasks));
  // }

  getToday() {
    const today = new Date();
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return today.toLocaleDateString("en-GB", options);
  }

  getTodayTask() {
    let count = 0;
    const today = this.getToday();
    this.projects.forEach((pr) => {
      pr.tasks.forEach((t) => {
        t.date === today ? count++ : count;
      });
    });
    return count;
  }
}

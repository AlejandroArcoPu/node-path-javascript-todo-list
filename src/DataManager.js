import { Project } from "./Project";
import { Task } from "./Task";
import { User } from "./User";

export class DataManager {
  constructor(projects, tasks, user) {
    this.projects = projects;
    this.tasks = tasks;
    this.user = user;
  }

  addProject(project, color) {
    if (!this.projects.find((p) => p.name === project)) {
      const newProject = new Project(project, color);
      this.projects.push(newProject);
      localStorage.setItem("projectsEasyTasks", JSON.stringify(this.projects));
    }
  }

  addUser(user) {
    this.user = new User(user);
    localStorage.setItem("userNameEasyTasks", JSON.stringify(this.user));
  }

  removeProject(project) {
    this.projects = this.projects.filter((p) => project.name !== p.name);
  }

  addTask(task) {}

  removeTask(task) {}
}

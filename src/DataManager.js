import { Project } from "./Project";
import { Task } from "./Task";

export class DataManager {
  constructor(projects = [new Project("My Tasks", "red")], tasks) {
    this.projects = projects;
    this.tasks = tasks;
  }

  addProject(project) {
    if (!this.projects.find((p) => p.name === project.name)) {
      this.projects.push(project);
    }
  }

  removeProject(project) {
    this.projects = this.projects.filter((p) => project.name !== p.name);
  }

  addTask(task) {}

  removeTask(task) {}
}

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
    localStorage.setItem("projectsEasyTasks", JSON.stringify(this.projects));
  }

  addTask(title, description, priority, date, status, project) {
    const newTask = new Task(
      title,
      description,
      date,
      priority,
      status,
      project
    );
    this.tasks.push(newTask);
    localStorage.setItem("tasksEasyTasks", JSON.stringify(this.tasks));
  }

  removeTask(task) {
    this.tasks = this.tasks.filter((t) => task.name !== t.name);
    localStorage.setItem("tasksEasyTasks", JSON.stringify(this.tasks));
  }

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
    const today = this.getToday();
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const todayTasks = this.tasks.filter(
      (t) => new Date(t.date).toLocaleDateString("en-GB", options) === today
    );
    return todayTasks;
  }
}

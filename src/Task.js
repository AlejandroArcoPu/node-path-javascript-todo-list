export class Task {
  constructor(
    title,
    description,
    dueDate,
    priority,
    notes,
    status,
    subtasks,
    project
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.status = status;
    this.subtasks = subtasks;
    this.project = project;
  }
}

export class Project {
  constructor(name, color, description) {
    this.name = name;
    this.color = color;
    this.description = description;
  }

  get name() {
    return this.name;
  }
  get color() {
    return this.color;
  }
  get description() {
    return this.description;
  }
}

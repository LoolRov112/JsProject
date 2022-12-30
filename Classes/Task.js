export default class Task {
  constructor(description) {
    this.description = description;
    this.complete = false;
    this.id = Math.floor(Math.random() * 1001);
  }

  get(propName) {
    return this[propName];
  }
  getId() {
    return this.id;
  }
  set(propName, value) {
    this[propName] = value;
  }
}

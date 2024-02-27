export class HabitSquare extends EventTarget {
  constructor(id, title, done) {
    super();
    this.id = id;
    this.title = title;
    this._isDone = done;

    this.element = createElement(this.isDone);

    this.element.addEventListener("click", () => {
      const event = new CustomEvent("toggle");
      this.dispatchEvent(event);
    });

    this.render();
  }

  render() {
    this.element.appendChild(createTitleElement(this.title));

    this.element.appendChild(createDoneElement(this.isDone));
  }

  destroy() {
    this.element.remove();
  }

  get isDone() {
    return this._isDone;
  }

  set isDone(value) {
    this._isDone = value;
    this.element.classList.toggle("done", this.isDone);
  }
}

const createTitleElement = (title) => {
  const titleElement = document.createElement("span");
  titleElement.innerText = title;
  return titleElement;
};

const createDoneElement = (isDone) => {
  const doneElement = document.createElement("span");
  doneElement.innerText = isDone ? "✅" : "❌";
  return doneElement;
};

const createElement = (isDone) => {
  const element = document.createElement("button");

  element.classList.add("habit-square");
  if (isDone) {
    element.classList.add("habit-done");
  }

  return element;
};

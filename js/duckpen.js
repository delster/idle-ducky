import Duck from "./duck.js";

export default class {
  constructor() {
    // Cache DOM Elements.
    this.tag = document.querySelector(".duckpen");
    this.headerTag = document.querySelector(".duckpen__header");
    this.countTag = document.querySelector(".duckpen__count");
    this.maxTag = document.querySelector(".duckpen__max");

    // Variables
    this.count = 0;
    this.max = 4;
    this.ducks = [];
  }

  // Adds a duck to the Duck Pen. Default tier: 1
  addDuck(tier = 1) {
    // Create Duck.
    let newDuck = new Duck(tier);
    // Add to Ducks array.
    this.ducks.push(newDuck);
    this.count++;
    // Inform the front-end.
    this.updateUI();
  }

  // Returns the total rate of the ducks.
  generate() {
    return this.ducks.reduce((t, d) => t + d.rate, 0);
  }

  // Returns true if the Duck Pen is not full.
  hasRoom() {
    return this.count < this.max;
  }

  // Refresh the UI (ul+li's).
  updateUI() {
    // TODO: Test the ul stuff for performance issues.
    this.countTag.textContent = this.count;
    this.maxTag.textContent = this.max;

    // Remove current list items from the Duck Pen.
    this.tag
      .querySelectorAll(".collection-item")
      .forEach(e => e.parentNode.removeChild(e));

    // Create a DocFrag to contain Duck Elements (to prevent multiple repaints).
    let frag = document.createDocumentFragment();
    this.ducks.forEach(duck => {
      frag.appendChild(duck.el);
    });

    this.tag.appendChild(frag);
  }
}

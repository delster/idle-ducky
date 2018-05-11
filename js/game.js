// TODO: Refactor into "Duck", "Duck Pen", "Game" classes at least.
import Duck from "./duck.js";
export default class {
  constructor() {
    // Cache DOM elements.
    this.dpCounter = document.querySelector("#duckpower-counter > span");
    this.dpClicker = document.querySelector("#duckpower-generator");
    this.duckBuyButton = document.querySelector("#buyduck-button");
    this.duckPen = document.querySelector("#duckpen > ul");
    this.duckPenCounter = document.querySelector("#duckpen-count");
    this.duckPenMax = document.querySelector("#duckpen-max");
    // Variables
    this.dp = 0;
    this.duckPenCount = 0;
    this.duckPenMax = 4;
    this.duckPrice = 10;

    // Click Event Listener on Generator Button.
    this.dpClicker.addEventListener("click", () => {
      this.dpCounter.textContent = ++this.dp;
    });

    // Click Event Listener on "Buy Duck" Button.
    this.duckBuyButton.addEventListener("click", () => {
      // If we can't afford it, or there's no room, do nothing.
      if (this.dp < this.duckPrice || this.duckPenCount >= this.duckPenMax)
        return;

      // If we can afford it, and there's room, do it.
      this.buyDuck();
    });
  }

  // This fires when someone purchases a duck.
  buyDuck() {
    // Remove the cost of the duck from the current currency.
    this.dp -= this.duckPrice;
    // Create a new duck (tier 1.. for now..)
    let newDuck = new Duck(1);
    // Add the duck to the Duck Pen.
    addDuck(newDuck);
  }

  // This adds a duck (li) to the Duck Pen (ul) and counts it.
  addDuck(duck) {
    this.duckpen.appendChild(duck.el);
    this.duckPenCount++;
  }
}

// TODO: Refactor into "Duck", "Duck Pen", "Game" classes at least.
import Duck from "./duck.js";
export default class {
  constructor() {
    // Cache DOM elements.
    this.dpCounter = document.querySelector("#duckpower-counter > span");
    this.dpClicker = document.querySelector("#duckpower-generator");
    this.duckBuyButton = document.querySelector("#buyduck-button");
    this.duckPen = document.querySelector("#duckpen > ul");
    this.duckPenCountTag = document.querySelector("#duckpen__count");
    this.duckPenMaxTag = document.querySelector("#duckpen__max");

    // Variables
    this.dp = 0;
    this.duckPenCount = 0;
    this.duckPenMax = 4;
    this.duckPrice = 10;
    this.loopInterval = 100;

    // Click Event Listener on "Buy Duck" Button.
    this.duckBuyButton.addEventListener("click", () => {
      // If we can't afford it, or there's no room, do nothing.
      if (this.dp < this.duckPrice || this.duckPenCount >= this.duckPenMax)
        return;

      // If we can afford it, and there's room, do it.
      this.buyDuck();
    });

    // Click Event Listener on Generator Button.
    this.dpClicker.addEventListener("click", () => {
      this.dpCounter.textContent = ++this.dp;
    });

    setInterval(() => {
      this.doGameLoop();
    }, this.loopInterval);
  } // constructor

  // This fires when someone purchases a duck.
  buyDuck() {
    // Remove the cost of the duck from the current currency.
    this.dp -= this.duckPrice;
    // Create a new duck (tier 1.. for now..)
    let newDuck = new Duck(1);
    // Add the duck to the Duck Pen.
    this.addDuck(newDuck);
  }

  // This adds a duck (li) to the Duck Pen (ul) and counts it.
  addDuck(duck) {
    this.duckPen.appendChild(duck.el);
    this.duckPenCount++;
  }

  // The meat of the game, our timer that ticks production, etc.
  doGameLoop() {
    // Update UI. Some of this doesn't need to be in the loop.
    this.dpCounter.textContent = this.dp;
    this.duckPenCountTag.textContent = this.duckPenCount;
    this.duckPenMaxTag.textContent = this.duckPenMax;
  }
}

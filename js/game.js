import DuckPen from "./duckpen.js";

export default class {
  constructor() {
    // Cache DOM elements.
    this.dpCounter = document.querySelector(".duckpower__counter");
    this.dpClicker = document.querySelector(".duckpower__button-generate");
    this.duckBuyButton = document.querySelector(".duckpower__button-buyduck");
    this.duckPenBuyButton = document.querySelector(".duckpower__button-buypen");

    // Variables
    this.dp = 0;
    this.duckPrice = 10;
    this.loopInterval = 10;

    // Instantiate our Duck Pen.
    this.duckPen = new DuckPen(this);

    // Click Event Listener on Generator Button.
    this.dpClicker.addEventListener("click", () => {
      ++this.dp;
    });

    // Click Event Listener on "Buy Duck" Button.
    this.duckBuyButton.addEventListener("click", () => {
      // If we can't afford it, or there's no room, do nothing.
      if (this.dp < this.duckPrice || !this.duckPen.hasRoom()) return;
      // If we can afford it, and there's room, do it.
      this.buyDuck();
    });

    // Click Event Listener on "Buy Duck Pen" Button.
    this.duckPenBuyButton.addEventListener("click", () => {
      // If we can't afford it, do nothing.
      if (this.dp < this.duckPen.penPrice) return;

      // If we can afford it, do it.
      this.buyPen();
    });

    // The main loop of the game.
    setInterval(() => {
      this.doGameLoop();
    }, this.loopInterval);
  } // constructor

  // This fires when someone purchases a duck.
  buyDuck() {
    // Remove the cost of the duck from the current currency.
    this.dp -= this.duckPrice;
    // Let the Duck Pen handle adding the duck.
    this.duckPen.addDuck();
  } // buyDuck()

  buyPen() {
    // Remove the cost of the pen from the current currency.
    this.dp -= this.duckPen.penPrice;
    // Let Duck Pen do the work and hide the button.
    this.duckPen.addPen();
    this.duckPenBuyButton.classList.add("hide");
  }
  // The meat of the game, our timer that ticks production, etc.
  doGameLoop() {
    // Update UI.
    this.dpCounter.textContent = this.dp.toFixed(2);
    // Generate Duck Power from Duck Pen.
    this.dp += this.duckPen.generate();
  } // doGameLoop()
} // class

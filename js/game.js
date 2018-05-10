export default class Game {
  constructor() {
    // Cache DOM elements.
    this.dpCounter = document.querySelector("#duckpower-counter > span");
    this.dpClicker = document.querySelector("#duckpower-generator");
    this.duckPen = document.querySelector("#duckpen > ul");
    this.duckPenCounter = document.querySelector("#duckpen-count");
    this.duckPenMax = document.querySelector("#duckpen-max");
    // Variables
    this.dp = 0;
    this.duckPenCount = 0;
    this.duckPenMax = 4;

    // Click Event Listener on Generator Button.
    this.dpClicker.addEventListener("click", () => {
      this.dpCounter.textContent = ++this.dp;
    });
  }

}
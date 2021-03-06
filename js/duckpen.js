import Duck from "./duck.js";

export default class {
  constructor(game = null) {
    // Cache DOM Elements.
    this.tag = document.querySelector(".duckpen");
    this.headerTag = document.querySelector(".duckpen__header");
    this.countTag = document.querySelector(".duckpen__count");
    this.penPriceTag = document.querySelector(".duckpen__cost");
    this.maxTag = document.querySelector(".duckpen__max");

    // Variables
    this.max = 4;
    this.ducks = [];
    this.penPrice = this.getPenPrice();

    // Reference to Game.
    this.game = game;

    // Drag-n-Drop References.
    this.draggedDuck = null;
    this.dropTargetDuck = null;

    // Init the UI.
    this.updateUI();
  } // constructor

  // Adds a duck to the Duck Pen. Default tier: 1
  addDuck(tier = 1) {
    // Create Duck.
    let newDuck = new Duck(this, tier);

    // Add to Ducks array.
    this.ducks.push(newDuck);

    // Inform the front-end.
    this.updateUI();
  } // addDuck()

  // Add a space to the Duck Pen.
  addPen() {
    this.max++;
    this.penPrice = this.getPenPrice();
    this.updateUI();
  }

  // Get the Pen Price based on the current max slots.
  getPenPrice() {
    return this.max * Duck.calcCombineCost(this.max);
  }

  // Returns the total rate of the ducks.
  generate() {
    return this.ducks.reduce((t, d) => t + d.rate, 0);
  } // generate()

  // Returns true if the Duck Pen is not full.
  hasRoom() {
    return this.ducks.length < this.max;
  } // hasRoom()

  // Handles Ducks dropping on each other.
  // Assumes Ducks self-assign references prior to the call.
  dropDuck() {
    // Check if the tiers match:
    if (this.draggedDuck.tier != this.dropTargetDuck.tier) return;
    // Check if they're the same:
    if (this.draggedDuck == this.dropTargetDuck) return;
    // Check if affordable:
    if (this.dropTargetDuck.combineCost > this.game.dp) return;

    // We passed basic validation, charge the combination cost.
    this.game.dp -= this.dropTargetDuck.combineCost;
    // Upgrade drop target.
    this.dropTargetDuck.setTier(++this.dropTargetDuck.tier);
    // Delete dragged duck.
    this.ducks.splice(this.ducks.indexOf(this.draggedDuck), 1);

    // Check if we should let them buy a pen.
    if (this.dropTargetDuck.tier == this.max) {
      this.game.duckPenBuyButton.classList.remove("hide");
    }

    // Inform the front-end.
    this.updateUI();
  } // dropDuck()

  // Refresh the UI (ul+li's).
  updateUI() {
    // TODO: Test the ul stuff for performance issues.
    this.countTag.textContent = this.ducks.length;
    this.maxTag.textContent = this.max;
    this.penPriceTag.textContent = this.penPrice.toFixed(2);

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
  } // updateUI()
} // class

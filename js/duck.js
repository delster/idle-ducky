export default class {
  constructor(duckpen = null, tier = 0) {
    // Create DOM Element.
    this.el = document.createElement("li");
    this.el.setAttribute("draggable", true);
    this.el.object = this;

    // Set the data for the object.
    this.setTier(tier);

    // Create reference to duckpen (DuckList).
    this.duckpen = duckpen;

    // If a duckpen was passed, allow DnD.
    if (this.duckpen != null) {
      // Add drag-n-drop listeners.
      this.initDragDrop();
    }
  } // constructor

  // Determines the combination cost based on a given tier.
  static calcCombineCost(t) {
    // Cost of combining level 1s.
    const BASE_COST = 10;

    // Scaling: t_1 = 10^(1.01), t_2 = (2*t_1)^(1.02), t_3 = (2*t_2)^(1.03), ...
    if (t == 1) {
      // Base case is 1, which returns 10^(1.01)
      return Math.pow(BASE_COST, 1.01);
    } else {
      // Case >1: (2 * LastTierCost)^1+(x/100).
      return Math.pow(2 * this.calcCombineCost(t - 1), 1 + t / 100);
    }
  } // calcCombineCost()

  // Set the properties to values based on a given tier.
  setTier(t) {
    // Pseudo-Enum
    const TIERS = Object.freeze({
      0: { tier: 0, color: "amber", rate: 0 },
      1: { tier: 1, color: "cyan", rate: 0.001 },
      2: { tier: 2, color: "red", rate: 0.0015 },
      3: { tier: 3, color: "green", rate: 0.00225 },
      4: { tier: 4, color: "deep-purple", rate: 0.003375 },
      5: { tier: 5, color: "lime", rate: 0.0050625 },
      6: { tier: 6, color: "blue", rate: 0.00759375 },
      7: { tier: 7, color: "light-blue", rate: 0.011390625 },
      8: { tier: 8, color: "pink", rate: 0.0170859375 },
      9: { tier: 9, color: "purple", rate: 0.02562890625 },
      10: { tier: 10, color: "indigo", rate: 0.038443359375 }
    });

    // Read Enum for given tier, assign those values to this instance.
    let vals = TIERS[t];
    Object.assign(this, vals);

    // Set the combination cost.
    this.combineCost = this.constructor.calcCombineCost(t);

    // Update the DOM Element of the changes.
    this.updateEl();
  } // setTier()

  // Updates the DOM Element's contents. Maintains events, object reference, etc.
  updateEl() {
    // Store once, use throughout.
    let cl = this.el.classList;

    // Remove all classes.
    while (cl.length) {
      cl.remove(cl[0]);
    }

    // Add classes.
    cl.add("ducky", this.color, "collection-item");

    // Set text.
    this.el.innerHTML = `This is a Tier ${this.tier} Duck.
                         It generates DP at a rate of ${this.rate}.`;

    // Set Data attribute for pseudo-element (overlay) text.
    this.el.dataset.cost = this.combineCost.toFixed(2);
  } // updateEl()

  // Drag-n-Drop Handlers
  initDragDrop() {
    // General Flow: http://apress.jensimmons.com/v5/pro-html5-programming/images/ch9/fig9-3.jpg
    // dragstart ->
    //   dragleave (on dragged) ->
    //   dragenter (on target) ->
    //   dragover (on target) ->
    //   drop ->
    //   dragend
    this.el.addEventListener("dragstart", this.dragstart);
    this.el.addEventListener("dragend", this.dragend);
    this.el.addEventListener("dragover", this.dragover);
    this.el.addEventListener("dragenter", this.dragenter);
    this.el.addEventListener("dragleave", this.dragleave);
    this.el.addEventListener("drop", this.drop);
  } // initDragDrop()

  // This fires when the user starts to drag a Ducky.
  // Fires on: Dragged
  dragstart(e) {
    // TODO: Initialize drag state here.
    setTimeout(() => {
      this.classList.add("held");
    }, 0);

    // Set this as the dragged element in Duck Pen.
    if (this.object.duckpen != null) {
      this.object.duckpen.draggedDuck = this.object;
    }
  } // dragstart()

  // This fires when a draggable enters into a potential drop target.
  // Fires on: Target
  dragenter(e) {
    // Display an overlay based on whether combining is affordable.
    this.classList.add( (this.object.duckpen.game.dp >= this.dataset.cost) ? "can-afford" : "cant-afford");
  } // dragenter()

  // This fires when a draggable is over a potential drop target.
  // Fires on: Target
  dragover(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    return false;
  } // dragover()

  // This fires when a draggable exits from a potential drop target.
  // Fires on Target
  dragleave(e) {
    // TODO: Cleanup drag feedback on the target.
    this.classList.remove("can-afford");
    this.classList.remove("cant-afford");
  } // dragleave()

  // This fires when a Duck is dropped onto another.
  // Fires on: Target
  drop(e) {
    e.stopPropagation();

    // Cleanup drag feedback on drop target.
    this.classList.remove("can-afford");
    this.classList.remove("cant-afford");

    // Let DuckPen handle the drop.
    if (this.object.duckpen != null) {
      this.object.duckpen.dropTargetDuck = this.object;
      this.object.duckpen.dropDuck();
    }

    return false;
  } // drop()

  // This fires when the user stops dragging a Ducky (regardless if it is "dropped").
  // Fires on: Dragged
  dragend() {
    // Cleanup drag state on dragged.
    this.classList.remove("held");

    // Clear references to drag Ducks in Duck Pen.
    if (this.duckpen != null) {
      this.duckpen.draggedDuck = null;
      this.duckpen.dropTargetDuck = null;
    }
  } // dragend()

} // class

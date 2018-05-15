export default class {
  constructor(tier) {
    switch (tier) {
      case 1:
        this.tier = 1;
        this.rate = 0.001;
        this.color = "cyan";
        break;
      case 2:
        this.tier = 2;
        this.rate = 0.0015;
        this.color = "pink";
        break;
      case 3:
        this.tier = 3;
        this.rate = 0.00225;
        this.color = "purple";
        break;
      case 4:
        this.tier = 4;
        this.rate = 0.003375;
        this.color = "deep-purple";
        break;
      case 5:
        this.tier = 5;
        this.rate = 0.0050625;
        this.color = "indigo";
        break;
      case 6:
        this.tier = 6;
        this.rate = 0.00759375;
        this.color = "blue";
        break;
      case 7:
        this.tier = 7;
        this.rate = 0.011390625;
        this.color = "light-blue";
        break;
      case 8:
        this.tier = 8;
        this.rate = 0.0170859375;
        this.color = "red";
        break;
      case 9:
        this.tier = 9;
        this.rate = 0.02562890625;
        this.color = "green";
        break;
      case 10:
        this.tier = 10;
        this.rate = 0.038443359375;
        this.color = "lime";
        break;
      default:
        this.tier = 0;
        this.rate = 0;
        this.color = "amber";
    } // switch(tier)
    // Create DOM Element.
    this.el = document.createElement("li");
    this.el.setAttribute("draggable", true);
    this.el.classList.add("ducky", this.color, "collection-item");
    this.el.innerHTML = `This is a Tier ${this.tier} Duck.
                         It generates DP at a rate of ${this.rate}.`;

    // Add drag-n-drop listeners.
    this.initDragDrop();
  } // constructor

  // Drag-n-Drop Handlers
  initDragDrop(el) {
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
  }
  // This fires when the user starts to drag a Ducky.
  // Fires on: Dragged
  dragstart() {
    // TODO: Initialize drag state here.
    this.classList.add("held");
    setTimeout(() => (this.classList.add("hide"), 0));
  }
  // This fires when a draggable enters into a potential drop target.
  // Fires on: Target
  dragenter(e) {
    e.preventDefault();
  }
  // This fires when a draggable is over a potential drop target.
  // Fires on: Target
  dragover(e) {
    e.preventDefault();
  }
  // This fires when a draggable exits from a potential drop target.
  // Fires on Target
  dragleave() {
    // TODO: Cleanup drag feedback on the target.
  }
  // This fires when a Duck is dropped onto another.
  // Fires on: Target
  drop() {
  }
  // This fires when the user stops dragging a Ducky (regardless if it is "dropped").
  // Fires on: Dragged
  dragend() {
    // TODO: Cleanup drag state here.
    this.classList.remove("hide");
  }
} // class

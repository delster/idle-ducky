export default class {
  constructor(tier) {
    switch (tier) {
      case 1:
        this.tier = 1;
        this.rate = 0.01;
        this.color = "cyan";
        break;
      case 2:
        this.tier = 2;
        this.rate = 0.015;
        this.color = "pink";
        break;
      case 3:
        this.tier = 3;
        this.rate = 0.0225;
        this.color = "purple";
        break;
      case 4:
        this.tier = 4;
        this.rate = 0.03375;
        this.color = "deep-purple";
        break;
      case 5:
        this.tier = 5;
        this.rate = 0.050625;
        this.color = "indigo";
        break;
      case 6:
        this.tier = 6;
        this.rate = 0.0759375;
        this.color = "blue";
        break;
      case 7:
        this.tier = 7;
        this.rate = 0.11390625;
        this.color = "light-blue";
        break;
      case 8:
        this.tier = 8;
        this.rate = 0.170859375;
        this.color = "red";
        break;
      case 9:
        this.tier = 9;
        this.rate = 0.2562890625;
        this.color = "green";
        break;
      case 10:
        this.tier = 10;
        this.rate = 0.38443359375;
        this.color = "lime";
        break;
      default:
        this.tier = 0;
        this.rate = 0;
        this.color = "amber";
    } // switch(tier)
    this.el = document.createElement("li");
    this.el.classList.add(this.color, "collection-item");
    this.el.innerHTML = `This is a Tier ${this.tier} Duck.
                         It generates DP at a rate of ${this.rate}.`;
  } // constructor
} // class

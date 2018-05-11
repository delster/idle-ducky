export default class {
  constructor(tier) {
    switch (tier) {
      case 1:
        this.tier = 1;
        this.rate = 0.01;
        break;
      case 2:
        this.tier = 2;
        this.rate = 0.015;
        break;
      case 3:
        this.tier = 3;
        this.rate = 0.0225;
        break;
      case 4:
        this.tier = 4;
        this.rate = 0.03375;
        break;
      case 5:
        this.tier = 5;
        this.rate = 0.050625;
        break;
      case 6:
        this.tier = 6;
        this.rate = 0.0759375;
        break;
      case 7:
        this.tier = 7;
        this.rate = 0.11390625;
        break;
      case 8:
        this.tier = 8;
        this.rate = 0.170859375;
        break;
      case 9:
        this.tier = 9;
        this.rate = 0.2562890625;
        break;
      case 10:
        this.tier = 10;
        this.rate = 0.38443359375;
        break;
      default:
        this.tier = 0;
        this.rate = 0;
    } // switch(tier)
    this.el = document.createElement("li");
    this.el.appendChild(
      document.createTextNode(`This is a Tier ${this.tier} Duck.`)
    );
    this.el.appendChild(
      document.createTextNode(`It generates DP at a rate of ${this.rate}.`)
    );
  } // constructor
} // class

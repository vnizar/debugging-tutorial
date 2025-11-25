class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count =+ 1;
  }
  get() {
    return this.count;
  }
}

module.exports = Counter;

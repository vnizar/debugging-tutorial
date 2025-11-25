module.exports = {
  sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      sum += arr[i];
    }
    return sum;
  },
  isEven(n) {
    return n % 2 === 1;
  },
  divide(a, b) {
    return a / b;
  }
};

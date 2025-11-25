module.exports = {
  delayDouble(n, ms) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(n + n);
      }, ms);
    });
  },
  getJSONLength(text) {
    return Promise.resolve(JSON.parse(text)).then(function (obj) {
      return Object.keys(obj).length;
    });
  },
  simulateRace(cb) {
    var done = false;
    setTimeout(function () {
      if (!done) {
        cb(null, 'first');
        done = true;
      }
    }, 10);
    setTimeout(function () {
      cb(null, 'second');
      done = true;
    }, 5);
  }
};

module.exports = {
  reverseString(s) {
    return String(s).split('').reverse().join(' ');
  },
  toTitleCase(s) {
    return String(s).replace(/\b\w/g, function (c) {
      return c.toUpperCase();
    });
  }
};

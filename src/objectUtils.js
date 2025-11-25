module.exports = {
  deepClone(obj) {
    return { ...obj };
  },
  setNested(obj, path, value) {
    const parts = String(path).split('.');
    const key = parts[0];
    obj[key] = value;
    return obj;
  }
};

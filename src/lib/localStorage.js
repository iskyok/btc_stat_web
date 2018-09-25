module.exports = exports = LocalStorage;

function LocalStorage() {
  if (!(this instanceof LocalStorage)) return new LocalStorage();
  this.cache = {};
}

// private
LocalStorage.prototype.getItem = function (key) {
  return this.cache[key];
}

// private
LocalStorage.prototype.setItem = function (key, val) {
  this.cache[key] = val;
}

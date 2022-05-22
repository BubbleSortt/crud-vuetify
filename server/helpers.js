const { reduce } = require('lodash');

module.exports = {
  prepareForIn: function prepareForIn(items) {
    return reduce(items, (string, item, idx) => {
      return  ++idx === items.length ? string + item + ')' : string + item + ',';
    }, '(')
  }
}

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

import toObject from 'to-object-x';
import filter from 'array-filter-x';
import getOPS from 'get-own-property-symbols-x';
import propertyIsEnumerable from 'property-is-enumerable-x';
/**
 * This method returns only the enumerable own property symbols of an object.
 *
 * @param {object} target - The target.
 * @throws {TypeError} - If target is null or undefined.
 * @returns {Array} The enumerable own property symbols.
 */

var getOwnEnumerablePropertySymbols = function getOwnEnumerablePropertySymbols(target) {
  var _this = this;

  var object = toObject(target);
  return filter(getOPS(object), function (symbol) {
    _newArrowCheck(this, _this);

    return propertyIsEnumerable(object, symbol);
  }.bind(this));
};

export default getOwnEnumerablePropertySymbols;

//# sourceMappingURL=get-own-enumerable-property-symbols-x.esm.js.map
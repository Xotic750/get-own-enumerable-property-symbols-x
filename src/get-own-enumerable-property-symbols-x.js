/**
 * @file Like Object.getOwnPropertySymbols but gets only enumerable properties.
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-own-enumerable-property-symbols-x
 */

const toObject = require('to-object-x');
const filter = require('array-filter-x');
const getOPS = require('get-own-property-symbols-x');
const propertyIsEnumerable = require('property-is-enumerable-x');

/**
 * This method returns only the enumerable own property symbols of an object.
 *
 * @param {object} target - The target.
 * @throws {typeError} - If target is null or undefined.
 * @returns {Array} The enumerable own property symbols.
 * @example
 * var getOwnEnumerablePropertySymbols = require('get-own-enumerable-property-symbols-x');
 *
 * var obj = { bar: 1, foo: 2 };
 *
 * var symbol1 = Symbol('first');
 * Object.defineProperty(obj, symbo1l, {
 *   enumerable: false,
 *   value: 'first'
 * });
 *
 * var symbol2 = Symbol('second');
 * Object.defineProperty(obj, symbol2, {
 *   enumerable: true,
 *   value: 'second'
 * });
 *
 * getOwnEnumerablePropertySymbols(obj); // [symbol2]
 */
// eslint-disable-next-line id-length
module.exports = function getOwnEnumerablePropertySymbols(target) {
  const object = toObject(target);

  return filter(getOPS(object), function(symbol) {
    return propertyIsEnumerable(object, symbol);
  });
};

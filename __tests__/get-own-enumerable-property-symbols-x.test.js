import getOEPS from '../src/get-own-enumerable-property-symbols-x';

/* eslint-disable-next-line compat/compat */
const hasSymbolSupport = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';

let definedNonEnumerable;
let definedEnumerable;

if (hasSymbolSupport) {
  /* eslint-disable-next-line compat/compat */
  let testObj = Object.defineProperty({}, Symbol('first'), {
    enumerable: false,
    value: 'first',
  });

  /* eslint-disable-next-line compat/compat */
  const nonEnum = Object.getOwnPropertySymbols(testObj);
  /* eslint-disable-next-line no-prototype-builtins */
  definedNonEnumerable = nonEnum.length === 1 && Object.propertyIsEnumerable(testObj, nonEnum) === false;

  /* eslint-disable-next-line compat/compat */
  testObj = Object.defineProperty({}, Symbol('second'), {
    enumerable: true,
    value: 'second',
  });

  /* eslint-disable-next-line compat/compat */
  definedEnumerable = Object.getOwnPropertySymbols(testObj).length === 1;
}

const ifNonEnumerableSymbols = definedNonEnumerable ? it : xit;
const ifEnumerableSymbols = definedEnumerable ? it : xit;

describe('getOEPS', function() {
  it('is a function', function() {
    expect.assertions(1);
    expect(typeof getOEPS).toBe('function');
  });

  it('should throw when target is null or undefined', function() {
    expect.assertions(3);
    expect(function() {
      getOEPS();
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      /* eslint-disable-next-line no-void */
      getOEPS(void 0);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      getOEPS(null);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should work with other primitives', function() {
    expect.assertions(1);
    const values = [1, true, 'ac'];

    const expected = values.map(function() {
      return [];
    });

    const actual = values.map(function(value) {
      return getOEPS(value);
    });

    expect(actual).toStrictEqual(expected);
  });

  it('should return empty array', function() {
    expect.assertions(1);
    expect(getOEPS({bar: 1, foo: 2})).toStrictEqual([]);
  });

  ifNonEnumerableSymbols('should return enumerable own property symbols', function() {
    expect.assertions(1);
    /* eslint-disable-next-line compat/compat */
    const obj = Object.defineProperty({bar: 1, foo: 2}, Symbol('first'), {
      enumerable: false,
      value: 'first',
    });

    /* eslint-disable-next-line compat/compat */
    const symbol = Symbol('second');
    Object.defineProperty(obj, symbol, {
      enumerable: true,
      value: 'second',
    });

    expect(getOEPS(obj)).toStrictEqual([symbol]);
  });

  ifEnumerableSymbols('should return enumerable own property symbols', function() {
    expect.assertions(1);
    /* eslint-disable-next-line compat/compat */
    const symbol = Symbol('first');
    const obj = Object.defineProperty({bar: 1, foo: 2}, symbol, {
      enumerable: true,
      value: 'first',
    });

    expect(getOEPS(obj)).toStrictEqual([symbol]);
  });
});

import * as types from '../../scripts/core/types';

const _symbol = Symbol();
const _inputObject = {
	undefined: undefined,
	null: null,
	symbol: _symbol,
	number: 1,
	bigint: 9007199254740991n,
	string: 'A',
	boolean: true,
	array: ['A'],
	object: { a: 'A' },
	function: () => undefined,
};
const inputObject: unknown = _inputObject;

describe('types', () => {
	test.each([
		[true, undefined],
		[false, null],
		[false, Symbol()],
		[false, 1],
		[false, 9007199254740991n],
		[false, 'A'],
		[false, true],
		[false, ['A']],
		[false, { a: 'A' }],
		[false, () => undefined],
	])('isUndefined', (expected: boolean, input: unknown) => {
		expect(types.isUndefined(input)).toBe(expected);
	});

	test.each([
		[false, undefined],
		[true, null],
		[false, Symbol()],
		[false, 1],
		[false, 9007199254740991n],
		[false, 'A'],
		[false, true],
		[false, ['A']],
		[false, { a: 'A' }],
		[false, () => undefined],
	])('isNull', (expected: boolean, input: unknown) => {
		expect(types.isNull(input)).toBe(expected);
	});

	test.each([
		[false, undefined],
		[false, null],
		[true, Symbol()],
		[false, 1],
		[false, 9007199254740991n],
		[false, 'A'],
		[false, true],
		[false, ['A']],
		[false, { a: 'A' }],
		[false, () => undefined],
	])('isNull', (expected: boolean, input: unknown) => {
		expect(types.isSymbol(input)).toBe(expected);
	});

	test.each([
		[false, undefined],
		[false, null],
		[false, Symbol()],
		[false, 1],
		[false, 9007199254740991n],
		[true, 'A'],
		[false, true],
		[false, ['A']],
		[false, { a: 'A' }],
		[false, () => undefined],
	])('isString', (expected: boolean, input: unknown) => {
		expect(types.isString(input)).toBe(expected);
	});

	test.each([
		[false, undefined],
		[false, null],
		[false, Symbol()],
		[true, 1],
		[false, 9007199254740991n],
		[false, 'A'],
		[false, true],
		[false, ['A']],
		[false, { a: 'A' }],
		[false, () => undefined],
	])('isNumber', (expected: boolean, input: unknown) => {
		expect(types.isNumber(input)).toBe(expected);
	});

	test.each([
		[false, undefined],
		[false, null],
		[false, Symbol()],
		[false, 1],
		[true, 9007199254740991n],
		[false, 'A'],
		[false, true],
		[false, ['A']],
		[false, { a: 'A' }],
		[false, () => undefined],
	])('BigInt', (expected: boolean, input: unknown) => {
		expect(types.isBigInt(input)).toBe(expected);
	});

	test.each([
		[false, undefined],
		[false, null],
		[false, Symbol()],
		[false, 1],
		[false, 9007199254740991n],
		[false, 'A'],
		[true, true],
		[false, ['A']],
		[false, { a: 'A' }],
		[false, () => undefined],
	])('isBoolean', (expected: boolean, input: unknown) => {
		expect(types.isBoolean(input)).toBe(expected);
	});

	test.each([
		[false, undefined],
		[false, null],
		[false, Symbol()],
		[false, 1],
		[false, 9007199254740991n],
		[false, 'A'],
		[false, true],
		[true, ['A']],
		[false, { a: 'A' }],
		[false, () => undefined],
	])('isArray', (expected: boolean, input: unknown) => {
		expect(types.isArray(input)).toBe(expected);
	});

	test.each([
		[false, undefined],
		[false, null],
		[false, Symbol()],
		[false, 1],
		[false, 9007199254740991n],
		[false, 'A'],
		[false, true],
		[false, ['A']],
		[false, { a: 'A' }],
		[true, () => undefined],
	])('isFunction', (expected: boolean, input: unknown) => {
		expect(types.isFunction(input)).toBe(expected);
	});

	test('hasProperty', () => {
		const a1: unknown = {
			a: 1,
			b: 'B',
		};
		expect(types.hasProperty(a1, 'a')).toBeTruthy();
		expect(types.hasProperty(a1, 'b')).toBeTruthy();
		expect(types.hasProperty(a1, 'c')).toBeFalsy();
	});

	test('hasPrimaryProperty', () => {
		expect(types.hasPrimaryProperty({}, 'a', 'number')).toBeFalsy();
		expect(types.hasPrimaryProperty({ a: undefined }, 'a', 'number')).toBeFalsy();
		expect(types.hasPrimaryProperty({ a: null }, 'a', 'number')).toBeFalsy();
		expect(types.hasPrimaryProperty({ a: 1 }, 'a', 'number')).toBeTruthy();
		expect(types.hasPrimaryProperty({ A: 1 }, 'a', 'number')).toBeFalsy();
		expect(types.hasPrimaryProperty({ a: '1' }, 'a', 'number')).toBeFalsy();

		const a1: unknown = {
			a: 1,
			b: 'B',
		};
		expect(types.hasPrimaryProperty(a1, 'a', 'number')).toBeTruthy();
	});

	test.each([
		[true, inputObject, 'undefined'],
		[false, inputObject, 'null'],
		[false, inputObject, 'symbol'],
		[false, inputObject, 'number'],
		[false, inputObject, 'bigint'],
		[false, inputObject, 'string'],
		[false, inputObject, 'boolean'],
		[false, inputObject, 'array'],
		[false, inputObject, 'object'],
		[false, inputObject, 'function'],
	])('hasUndefined', (expected: boolean, input: unknown, key: string) => {
		expect(types.hasUndefined(input, key)).toBe(expected);
	});

	test.each([
		[false, inputObject, 'undefined'],
		[true, inputObject, 'null'],
		[false, inputObject, 'symbol'],
		[false, inputObject, 'number'],
		[false, inputObject, 'bigint'],
		[false, inputObject, 'string'],
		[false, inputObject, 'boolean'],
		[false, inputObject, 'array'],
		[false, inputObject, 'object'],
		[false, inputObject, 'function'],
	])('hasNull', (expected: boolean, input: unknown, key: string) => {
		expect(types.hasNull(input, key)).toBe(expected);
	});

	test.each([
		[false, inputObject, 'undefined'],
		[false, inputObject, 'null'],
		[true, inputObject, 'symbol'],
		[false, inputObject, 'number'],
		[false, inputObject, 'bigint'],
		[false, inputObject, 'string'],
		[false, inputObject, 'boolean'],
		[false, inputObject, 'array'],
		[false, inputObject, 'object'],
		[false, inputObject, 'function'],
	])('hasSymbol', (expected: boolean, input: unknown, key: string) => {
		expect(types.hasSymbol(input, key)).toBe(expected);
	});

	test.each([
		[false, inputObject, 'undefined'],
		[false, inputObject, 'null'],
		[false, inputObject, 'symbol'],
		[false, inputObject, 'number'],
		[false, inputObject, 'bigint'],
		[true, inputObject, 'string'],
		[false, inputObject, 'boolean'],
		[false, inputObject, 'array'],
		[false, inputObject, 'object'],
		[false, inputObject, 'function'],
	])('hasString', (expected: boolean, input: unknown, key: string) => {
		expect(types.hasString(input, key)).toBe(expected);
	});

	test.each([
		[false, inputObject, 'undefined'],
		[false, inputObject, 'null'],
		[false, inputObject, 'symbol'],
		[true, inputObject, 'number'],
		[false, inputObject, 'bigint'],
		[false, inputObject, 'string'],
		[false, inputObject, 'boolean'],
		[false, inputObject, 'array'],
		[false, inputObject, 'object'],
		[false, inputObject, 'function'],
	])('hasNumber', (expected: boolean, input: unknown, key: string) => {
		expect(types.hasNumber(input, key)).toBe(expected);
	});

	test.each([
		[false, inputObject, 'undefined'],
		[false, inputObject, 'null'],
		[false, inputObject, 'symbol'],
		[false, inputObject, 'number'],
		[true, inputObject, 'bigint'],
		[false, inputObject, 'string'],
		[false, inputObject, 'boolean'],
		[false, inputObject, 'array'],
		[false, inputObject, 'object'],
		[false, inputObject, 'function'],
	])('hasBigInt', (expected: boolean, input: unknown, key: string) => {
		expect(types.hasBigInt(input, key)).toBe(expected);
	});

	test.each([
		[false, inputObject, 'undefined'],
		[false, inputObject, 'null'],
		[false, inputObject, 'symbol'],
		[false, inputObject, 'number'],
		[false, inputObject, 'bigint'],
		[false, inputObject, 'string'],
		[true, inputObject, 'boolean'],
		[false, inputObject, 'array'],
		[false, inputObject, 'object'],
		[false, inputObject, 'function'],
	])('hasBoolean', (expected: boolean, input: unknown, key: string) => {
		expect(types.hasBoolean(input, key)).toBe(expected);
	});

	test.each([
		[false, inputObject, 'undefined'],
		[false, inputObject, 'null'],
		[false, inputObject, 'symbol'],
		[false, inputObject, 'number'],
		[false, inputObject, 'bigint'],
		[false, inputObject, 'string'],
		[false, inputObject, 'boolean'],
		[false, inputObject, 'array'],
		[true, inputObject, 'object'],
		[false, inputObject, 'function'],
	])('hasObject', (expected: boolean, input: unknown, key: string) => {
		expect(types.hasObject(input, key)).toBe(expected);
	});

	test.each([
		[false, inputObject, 'undefined'],
		[false, inputObject, 'null'],
		[false, inputObject, 'symbol'],
		[false, inputObject, 'number'],
		[false, inputObject, 'bigint'],
		[false, inputObject, 'string'],
		[false, inputObject, 'boolean'],
		[true, inputObject, 'array'],
		[false, inputObject, 'object'],
		[false, inputObject, 'function'],
	])('hasArray', (expected: boolean, input: unknown, key: string) => {
		expect(types.hasArray(input, key)).toBe(expected);
	});

	test.each([
		[false, inputObject, 'undefined'],
		[false, inputObject, 'null'],
		[false, inputObject, 'symbol'],
		[false, inputObject, 'number'],
		[false, inputObject, 'bigint'],
		[false, inputObject, 'string'],
		[false, inputObject, 'boolean'],
		[false, inputObject, 'array'],
		[false, inputObject, 'object'],
		[true, inputObject, 'function'],
	])('hasFunction', (expected: boolean, input: unknown, key: string) => {
		expect(types.hasFunction(input, key)).toBe(expected);
	});

	test.each([
		[undefined, inputObject, 'undefined', undefined],
		[null, inputObject, 'null', null],
		[_symbol, inputObject, 'symbol', _symbol],
		[1, inputObject, 'number', 1],
		[1, inputObject, 'number', 100],
		[100, inputObject, 'number1', 100],
		[9007199254740991n, inputObject, 'bigint', 9007199254740991n],
		['a', inputObject, 'bigint', 'a'],
		['A', inputObject, 'string', 'A'],
		[true, inputObject, 'boolean', true],
		[_inputObject.array, inputObject, 'array', ['A']],
		[_inputObject.object, inputObject, 'object', { a: 'A' }],
		[_inputObject.function, inputObject, 'function', () => undefined],
	])('getPropertyOr', <T>(expected: T, input: unknown, key: string, value: T) => {
		expect(types.getPropertyOr(input, key, value)).toBe(expected);
	});


	test('toBoolean', () => {
		expect(types.toBoolean(null)).toBeFalsy();
		expect(types.toBoolean(undefined)).toBeFalsy();
		expect(types.toBoolean("")).toBeFalsy();
		expect(types.toBoolean("t")).toBeFalsy();
		expect(types.toBoolean("f")).toBeFalsy();
		expect(types.toBoolean("false")).toBeFalsy();
		expect(types.toBoolean("FALSE")).toBeFalsy();
		expect(types.toBoolean("true")).toBeTruthy();
		expect(types.toBoolean("TRUE")).toBeTruthy();
	});

	test('toString', () => {
		expect(types.toString(null)).toBe('null');

		expect(types.toString(undefined)).toBe('undefined');

		expect(types.toString(false)).toBe('false');
		expect(types.toString(true)).toBe('true');

		expect(types.toString(1)).toBe('1');
	});
});

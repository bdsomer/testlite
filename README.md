# testlight
Easy, lightweight testing

[![Build Status](https://travis-ci.org/javacoolme/testlite.svg?branch=master)](https://travis-ci.org/javacoolme/testlite) ![testlite's Total Downloads on NPM](https://img.shields.io/npm/dt/testlite.svg) ![testlite's Version on NPM](https://img.shields.io/npm/v/testlite.svg) [![bitHound Overall Score](https://www.bithound.io/github/javacoolme/testlite/badges/score.svg)](https://www.bithound.io/github/javacoolme/testlite) [![bitHound Code](https://www.bithound.io/github/javacoolme/testlite/badges/code.svg)](https://www.bithound.io/github/javacoolme/testlite) [![Dependencies](https://www.bithound.io/github/javacoolme/testlite/badges/dependencies.svg)](https://www.bithound.io/github/javacoolme/testlite/master/dependencies/npm) [![Dev Dependencies](https://www.bithound.io/github/javacoolme/testlite/badges/devDependencies.svg)](https://www.bithound.io/github/javacoolme/testlite/master/dependencies/npm) [![Known Vulnerabilities](https://snyk.io/test/github/javacoolme/testlite/badge.svg)](https://snyk.io/test/github/javacoolme/testlite) ![google-sign-in's License](https://img.shields.io/npm/l/testlite.svg) ![google-sign-in's Stars on GitHub](https://img.shields.io/github/stars/javacoolme/testlite.svg?style=social&label=Star)

## Example Usage
```javascript
// tests/array.js

const assert = require('assert');
module.exports = {
	'indexOf()' : [
		describe => {
			describe('should return -1 when element is not found');
			return new Promise((resolve) => {
				assert.strictEqual([1, 2, 3].indexOf(4), -1);
				resolve();
			});
		}, describe => {
			describe('should return a zero-based location of an element when element is found');
			return new Promise((resolve) => {
				assert.strictEqual([1, 2, 3].indexOf(3), 2);
				resolve();
			});
		}
	], 'length' : [
		describe => {
			describe('should return the correct length of an array');
			return new Promise((resolve) => {
				assert.strictEqual([1, 2, 3].length, 3);
				assert.strictEqual([].length, 0);
				resolve();
			});
		}
	]
});

// tests/object.js

const assert = require('assert');
module.exports = {
	'keys()' : [
		describe => {
			describe('should return the keys of an object');
			return new Promise((resolve) => {
				assert.strictEqual(Object.keys({
					'oneKey'		: 'oneValue',
					'anotherKey'	: 'anotherValue'
				}), ['oneKey', 'anotherKey']);
				resolve();
			});
		}
	], 'assign()' : [
		describe => {
			describe('should merge two objects together');
			return new Promise((resolve) => {
				assert.strictEqual(Object.assign({
					'oneKey'		: 'oneValue',
					'anotherKey'	: 'anotherValue'
				}, {
					'someOtherKey'	: 'someOtherValue',
					'foo'			: 'bar'
				}), {
					'oneKey'		: 'oneValue',
					'anotherKey'	: 'anotherValue',
					'someOtherKey'	: 'someOtherValue',
					'foo'			: 'bar'
				});
				resolve();
			});
		},
		describe => {
			describe('elements later should take priority');
			return new Promise((resolve) => {
				assert.strictEqual(Object.assign({
					'oneKey'		: 'oneValue',
					'anotherKey'	: 'anotherValue'
				}, {
					'someOtherKey'	: 'someOtherValue',
					'anotherKey'	: 'notAnotherValue'
				}), {
					'oneKey'		: 'oneValue',
					'someOtherKey'	: 'someOtherValue',
					'anotherKey'	: 'notAnotherValue'
				});
				resolve();
			});
		}
	]
};

// tests/tests.js

const tl = require('testlite');
tl('Array', require('./array.js'));
tl('Object', require('./object.js'));
tl.test();
```

Note that it is **extremely** important to call `tl.test()` or else nothing will happen.

## API

- `require('testlite'): Function` - the function to create a test.
	- `testName: String` - the high-level name of the test, ex. `Array`.
	- `testTests: Object` - the tests.
		- The key is the lower-level name of the test, ex. `indexOf()`.
		- The value is an array of functions that test this functionality. Arguments and return values for this function are as follows:
			- `describe: Function` - the function that is used to describe the test. This should always be the first instruction of the test.
				- `description: String` - the description that is to be used.
			- **returns** a promise. A promise that resolves means success, a promise that rejects means failure.
- `require('testlite').test: Function` - the function to be called to start testing.

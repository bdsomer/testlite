# testlight
Easy, lightweight testing

[![Build Status](https://travis-ci.org/javacoolme/testlite.svg?branch=master)](https://travis-ci.org/javacoolme/testlite) ![testlite's Total Downloads on NPM](https://img.shields.io/npm/dt/testlite.svg) ![testlite's Version on NPM](https://img.shields.io/npm/v/testlite.svg) [![bitHound Overall Score](https://www.bithound.io/github/javacoolme/testlite/badges/score.svg)](https://www.bithound.io/github/javacoolme/testlite) [![bitHound Code](https://www.bithound.io/github/javacoolme/testlite/badges/code.svg)](https://www.bithound.io/github/javacoolme/testlite) [![Dependencies](https://www.bithound.io/github/javacoolme/testlite/badges/dependencies.svg)](https://www.bithound.io/github/javacoolme/testlite/master/dependencies/npm) [![Dev Dependencies](https://www.bithound.io/github/javacoolme/testlite/badges/devDependencies.svg)](https://www.bithound.io/github/javacoolme/testlite/master/dependencies/npm) [![Known Vulnerabilities](https://snyk.io/test/github/javacoolme/testlite/badge.svg)](https://snyk.io/test/github/javacoolme/testlite) ![google-sign-in's License](https://img.shields.io/npm/l/testlite.svg) ![google-sign-in's Stars on GitHub](https://img.shields.io/github/stars/javacoolme/testlite.svg?style=social&label=Star)

## Example Usage
```javascript
// add.js

module.exports = (num1, num2) => {
	return num1 + num2
};

// tests/addTest.js

const assert = require('assert');
const add = require('../add.js');
module.exports = {
	'exports' : [
		it => {
			it('should add two numbers');
			assert.strictEqual(add(1, 2), 3);
			assert.strictEqual(add(4, 5), 9);
		}, it => {
			it('should return NaN if one of the arguments is NaN');
			assert.strictEqual(add(NaN, 2), NaN);
			assert.strictEqual(add(parseInt('...'), 5), NaN);
			assert.strictEqual(add(NaN, NaN), NaN);
		}
	]
};

// tests/test.js

const tl = require('testlite');
tl('add.js', require('./addTest.js'));
tl.test();
```

Note that it is **extremely** important to call `tl.test()` or else nothing will happen.

## API

- `require('testlite'): Function` - the function to create a test.
	- `testName: String` - the high-level name of the test, ex. `Array`.
	- `testTests: Object` - the tests.
		- The key is the lower-level name of the test, ex. `indexOf()`.
		- The value is an array of functions that test this functionality. Arguments and return values for this function are as follows:
			- `it: Function` - the function that is used to describe the test. This should always be the first instruction of the test.
				- `description: String` - the description that is to be used.
			- **returns**
				- Nothing, if the test is synchronous.
				- If the test is asynchronous, a promise. A promise that resolves means success, a promise that rejects means failure.
- `require('testlite').test: Function` - the function to be called to start testing.

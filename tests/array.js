const assert = require('assert');

module.exports = {
	'indexOf()' : {
		'should return -1 when element is not found': () => {
			assert.strictEqual([1, 2, 3].indexOf(4), -1);
		}, 'should return a zero-based location of an element when element is found' : () => {
			assert.strictEqual([1, 2, 3].indexOf(3), 2);
		}
	}, 'length' : {
		'should return the correct length of an array': () => {
			assert.strictEqual([1, 2, 3].length, 3);
			assert.strictEqual([].length, 0);
		}
	}
};
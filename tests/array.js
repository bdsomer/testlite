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
};
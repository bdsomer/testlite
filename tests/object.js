const assert = require('assert');

module.exports = {
	'keys()' : [
		describe => {
			describe('should return the keys of an object');
			return new Promise((resolve) => {
                const objectKeys = Object.keys({
					'oneKey'		: 'oneValue',
					'anotherKey'	: 'anotherValue'
				});
				assert.equal(objectKeys[0], 'oneKey');
                assert.equal(objectKeys[1], 'anotherKey');
				resolve();
			});
		}
	], 'assign()' : [
		describe => {
			describe('should merge two objects together');
			return new Promise((resolve) => {
				assert.deepEqual(Object.assign({
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
				assert.deepEqual(Object.assign({
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
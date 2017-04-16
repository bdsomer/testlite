const assert = require('assert');

module.exports = {
	'keys()' : [
		it => {
			it('should return the keys of an object');
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
		it => {
			it('should merge two objects together');
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
		it => {
			it('should let elements later take priority');
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
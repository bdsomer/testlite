const assert = require('assert');

module.exports = {
	'keys()' : [
		it => {
			it('should return the keys of an object');
			const objectKeys = Object.keys({
				'oneKey'		: 'oneValue',
				'anotherKey'	: 'anotherValue'
			});
			assert.equal(objectKeys[0], 'oneKey');
			assert.equal(objectKeys[1], 'anotherKey');
		}
	], 'assign()' : [
		it => {
			it('should merge two objects together');
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
		},
		it => {
			it('should let elements later take priority');
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
		}
	]
};
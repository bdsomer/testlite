const assert = require('assert');
const fs = require('fs');

module.exports = {
	'readFile()' : [
		it => {
			it('should read the data of a file asynchronously');
			return new Promise((resolve, reject) => {
				fs.readFile('tests/testFile.txt', (err, data) => {
					if (err) {
						reject(err);
					} else {
						assert.equal('Make sure that the data is correct!', data);
						resolve();
					}
				});
			});
		},
		it => {
			it('should callback with an error if the file does not exist');
			return new Promise((resolve, reject) => {
				fs.readFile('tests/nonExistentFile.txt', (err) => {
					if (err) {
						resolve();
					} else {
						reject('Error was not thrown...');
					}
				});
			});
		}
	]
};
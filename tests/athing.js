const fs = require('fs');
new Promise(resolve => {
	fs.readFile('tests/testFile.txt', (err, data) => {
		resolve(data);
	})
}).then(data => {
	console.log(data);
});
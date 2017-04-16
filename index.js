// Object.values polyfill

const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
const concat = Function.bind.call(Function.call, Array.prototype.concat);
const keys = Reflect.ownKeys;

if (!Object.values) {
	Object.values = function values(O) {
		return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
	};
}

const tests = [];

module.exports = (testName, testTests) => {

	// Add this test to the list of tests that are to be run

	tests.push({
		'testName'  : testName,
		'tests'     : testTests
	});
};

// ✓ ✗

/**
 * Start all tests.
 * @param {boolean} [endOnFirstFail=false] True if the tests should end on the first failure.
 */
module.exports.test = (endOnFirstFail) => {

	/**
	 * The time that the tests started at
	 */
	const startTime = new Date();

	// Run all tests

	/**
	 * The current test that is running, as an index of `tests`.
	 */
	var currentTest = 0;

	/**
	 * The number of tests that failed.
	 */
	var failed = 0;

	/**
	 * The number of tests that passed.
	 */
	var passed = 0;

	/**
	 * Call to run all tests.
	 * @param {Function} callback What to call back when tests have finished. Calls back when a test fials if `endOnFirstFail` is true.
	 */
	const runTests = callback => {

		// If we have already failed and `endOnFirstFail` is on, immediately callback

		if (failed > 0 && endOnFirstFail) callback();

		// Check if all tests have been run

		if (currentTest < tests.length) {

			// If not, keep running tests

			/**
			 * The current test's test name.
			 */
			const testName = tests[currentTest].testName;

			// Log the name to the console

			console.log(testName);

			/**
			 * The current sub-test, as an index of `tests[currentTest].tests`.
			 */
			var currentSubTest = 0;

			/**
			 * The sub-test objects to be run.
			 */
			const subTestObjects = tests[currentTest].tests;

			/**
			 * The names of the sub-tests to be run.
			 */
			const subTestNames = Object.keys(subTestObjects);

			/**
			 * The sub-tests to be run.
			 */
			const subTests = Object.values(subTestObjects);
			
			/**
			 * Runs the sub-tests.
			 * @param {Function} callback What to call back to when the sub-tests are complete.
			 */
			const runSubTests = (callback) => {

				// If we have already failed and `endOnFirstFail` is on, immediately callback

				if (failed > 0 && endOnFirstFail) callback();
				
				// Check if all sub-tests have been run

				if (currentSubTest < subTestNames.length) {

					// Log the name of the sub-test

					console.log('\t' + subTestNames[currentSubTest]);

					// Run the sub-test's sub-tests

					/**
					 * The current sub-sub-test, as an index of `subTests`.
					 */
					var currentSubSubTest = 0;

					/**
					 * Runs the sub-sub-tests.
					 * @param {Function} callback What to call back to when the sub-sub-tests are complete.
					 */
					const runSubSubTests = (callback) => {

						// Check if all sub-sub-tests have been run

						if (currentSubSubTest < subTests[currentSubTest].length) {

							// Run the sub-sub test with the describe function

							/**
							 * The description of this sub-sub test.
							 */
							var description = '';
							
							/**
							 * Logs to console with the specified color code.
							 * @param {string} message The message to log to the console.
							 * @param {string} code The ANSI color code to use.
							 */
							const logWithColorCode = (message, code) => {
								console.log(code + message + /* Reset the color! */ '\x1b[0m');
							};

							/**
							 * Runs the next sub-sub test.
							 */
							const next = () => {
								// Increment the `currentSubSubTest` and re-run

								currentSubSubTest++;
								runSubSubTests(callback);
							};

							/**
							 * The function to be run if the test succeeds.
							 */
							const onSuccess = () => {

								// Increment `passed`

								passed++;

								// Log the description in green with a ✓

								logWithColorCode('\t\t' + description + ' ✓', '\x1b[32m');

								// Run the next sub-sub test.

								next();

							}

							/**
							 * The function to be run if the test fails.
							 * @param {Error} err The error that occured.
							 */
							const onError = err => {

								// Increment `failed`

								failed++;

								// Log the description in red with an ✗

								logWithColorCode('\t\t' + description + ' ✗: ', '\x1b[31m');

								console.error(err);

								// Callback immediately if `endOnFirstFail` is true

								if (endOnFirstFail) callback();

								// Run the next sub-sub test.

								next();
							};

							// Wrap in a try-catch in case the test is synchronous

							/**
							 * The value that the test returned.
							 */
							var returnValue;
							try {
								returnValue = subTests[currentSubTest][currentSubSubTest](desc => {

									// Set the description

									description = desc;
								});
							} catch (err) {

								// The synchronous test failed, count an error an continue

								onError(err);
								return;
							}

							if (returnValue) {

								// The test was asynchronous and returned a promise

								returnValue.then(onSuccess, onError);
							} else {

								// The test was synchronous and finished without error, count a success and continue

								onSuccess();
							}
						} else {

							// If so, call back

							callback();
						}
					};

					// Run the sub-sub tests

					runSubSubTests(() => {

						// Increment the `currentSubTest` and re-run

						currentSubTest++;
						runSubTests(callback);
					});
				} else {

					// If so, call back

					callback();
				}
			};

			runSubTests(() => {

				// Increment the `currentGlobalTest` and re-run

				currentTest++;
				runTests(callback);
			});
		} else {

			// If so, call back

			callback();
		}
	};

	// Run all tests

	runTests(() => {

		// When finished, log info

		console.log('\n\n' + passed + ' tests are passing.\n' + failed + ' tests are failing.\n' + 'Tests took ' + (new Date().getTime() - startTime.getTime()) + 'ms.\n');

		if (failed) process.exit(1);
		else process.exit(0);
	});
};
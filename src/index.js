const math = require('./mathUtils');
const strings = require('./stringUtils');
const Counter = require('./counter');
const obju = require('./objectUtils');
const asyncu = require('./asyncUtils');

function logResult(name, expected, actual) {
  const pass = expected === actual;
<<<<<<< HEAD
  console.log(name + 'log version 2 expected=' + expected + ' actual=' + actual + ' ' + (pass ? 'PASS' : 'FAIL'));
=======
  console.log(name + 'log 1 expected=' + expected + ' actual=' + actual + ' ' + (pass ? 'PASS' : 'FAIL'));
>>>>>>> main
  return pass;
}

function runSync() {
  let failures = 0;
  failures += logResult('sumArray([1,2,3,4])', 10, math.sumArray([1, 2, 3, 4])) ? 0 : 1;
  failures += logResult('isEven(4)', true, math.isEven(4)) ? 0 : 1;
  failures += logResult("reverseString('hello')", 'olleh', strings.reverseString('hello')) ? 0 : 1;

  const c = new Counter();
  c.increment();
  c.increment();
  failures += logResult('Counter after 2 increments', 2, c.get()) ? 0 : 1;

  const original = { a: 1, nested: { b: 2 } };
  const copy = obju.deepClone(original);
  copy.nested.b = 3;
  const unchanged = original.nested.b === 2;
  console.log('deepClone preserves nested immutability ' + (unchanged ? 'PASS' : 'FAIL'));
  failures += unchanged ? 0 : 1;

  const obj2 = { nested: { b: 2 } };
  obju.setNested(obj2, 'nested.b', 99);
  const setOk = obj2.nested && obj2.nested.b === 99;
  console.log('setNested("nested.b") updates nested value ' + (setOk ? 'PASS' : 'FAIL'));
  failures += setOk ? 0 : 1;

  return failures;
}

function runAsync() {
  let failures = 0;
  return asyncu
    .delayDouble(5, 50)
    .then((v) => {
      failures += logResult('delayDouble(5)', 10, v) ? 0 : 1;
      return asyncu.getJSONLength('{"x":1,"y":2}');
    })
    .then((len) => {
      failures += logResult('getJSONLength valid', 2, len) ? 0 : 1;
      return new Promise((resolve) => {
        let calls = 0;
        asyncu.simulateRace((err, result) => {
          calls += 1;
          if (calls > 1) {
            console.log('simulateRace calls callback once FAIL');
            resolve();
            return;
          }
          if (result) {
            console.log('simulateRace calls callback once PASS');
          }
          resolve();
        });
      });
    })
    .then(() => {
      return Promise.resolve().then(() => failures);
    })
    .catch((e) => {
      console.log('Unexpected async error', e && e.message ? e.message : String(e));
      return failures + 1;
    });
}

function runAll() {
  const syncFailures = runSync();
  runAsync().then((asyncFailures) => {
    const total = syncFailures + asyncFailures;
    console.log('Total FAILURES=' + total);
    if (total === 0) {
      console.log('All checks PASS');
    } else {
      console.log('Some checks FAIL');
    }
  });
}

const arg = process.argv[2] || 'all';
if (arg === 'all') {
  runAll();
} else {
  if (arg === 'sync') {
    const failures = runSync();
    console.log('Sync FAILURES=' + failures);
  } else if (arg === 'async') {
    runAsync().then((failures) => console.log('Async FAILURES=' + failures));
  } else {
    console.log('Unknown option');
  }
}

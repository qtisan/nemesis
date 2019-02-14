const test = require('ava');
const copyDir = require('../lib/fs/copyDir');

test('what returned?', t => {
  copyDir('/Users/lennon/recent/uis/2', '/Users/lennon/temp/');
  t.pass();
});
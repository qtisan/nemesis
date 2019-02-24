const test = require('ava');
const copyDir = require('../lib/fs/copyDir');
const { zipDir } = require('../lib/fs/zip');

test('copy', t => {
  // copyDir('/Users/lennon/recent/uis/2', '/Users/lennon/temp/');
  t.pass();
});

test('zip dir', async t => {
  // let result = await zipDir('/Users/lennon/Downloads/screenshot', '/Users/lennon/temp/d.7z');
  // result ? t.pass(result) : t.fail();
});
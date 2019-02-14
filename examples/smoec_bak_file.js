
const moment = require('moment');
const bakup = require('../lib/fs/bakup');

bakup({
  prodDir: 'D:\\tomb',
  bakupPath: 'D:\\tomb_file\\',
  bakupCount: 60,
  current: moment()
});

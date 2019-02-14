
const copyDir = require('../lib/fs/copyDir');
const { readdir } = require('fs');
const { sep, join } = require('path');
const moment = require('moment');

const bakup = ({
  prodDir = 'D:\\tomb',
  bakupPath = 'D:\\tomb_files\\',
  current = moment()
}) => {
  const prodDirName = prodDir.substring(prodDir.lastIndexOf(sep) + 1);
  const currentTime = current.format('YYYYMMDDHHmmss');
  const lastMonth = current.subtract(1, 'months').format('YYYYMM');

  const bakup_dirs = readdir(bakupPath);
  const lastMonthDirs = bakup_dirs.filter(d => d.indexOf(lastMonth) == prodDirName.length);
  if (lastMonthDirs.length) {
    // zip & upload
  }
  copyDir(prodDir, join(bakupPath, `${prodDirName}${currentTime}`)).then();

};

module.exports = bakup;
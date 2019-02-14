
const { zipDir, zipFiles } = require('./zip');
const { readdirSync, unlinkSync } = require('fs');
const { sep, join } = require('path');
const moment = require('moment');

const bakup = ({
  prodDir = 'D:\\tomb',
  bakupPath = 'D:\\tomb_files\\',
  current = moment(),
  bakupCount = 60
}) => new Promise((resolve, reject) => {
  const prodDirName = prodDir.substring(prodDir.lastIndexOf(sep) + 1);
  const currentTime = current.format('YYYYMMDDHHmmss');

  const bakupZips = readdirSync(bakupPath)
    .filter(s => s.indexOf(prodDirName) === 0)
    .sort((a, b) => a > b ? -1 : 1)
    .map(p => join(bakupPath, p));

  if (bakupZips.length > bakupCount) {
    const toBeRms = bakupZips.slice(bakupCount);
    for (let tbr of toBeRms) {
      unlinkSync(tbr);
    }
  }

  zipDir(prodDir, join(bakupPath, `${prodDirName}${currentTime}.zip`))
    .then(resolve)
    .catch(reject);

});

module.exports = bakup;
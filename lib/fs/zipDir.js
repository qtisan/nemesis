
const AdmZip = require('adm-zip');
const { readdir, statSync } = require('fs');
const { join, sep } = require('path');

const zipDir = (src, dst) => new Promise((resolve, reject) => {
  const entries = readdir(src);
  const archive = new AdmZip();
  if (dst.indexOf('.zip') !== dst.length - 4) {
    dst = join(dst, `${src.substring(src.lastIndexOf(sep) + 1)}.zip`);
  }
  if (entries.length) {
    for (let e of entries) {
      const p = join(src, e);
      const s = statSync(p);
      if (s.isDirectory()) {
        archive.addLocalFolder(p);
      } else if (s.isFile()) {
        archive.addLocalFile();
      }
    }
    archive.writeZip(dst, (err) => {
      if (!err) {
        resolve(dst);
      } else {
        reject(err);
      }
    });
  }
});

module.exports = zipDir;

const AdmZip = require('adm-zip');
const { readdirSync, statSync } = require('fs');
const { join, sep } = require('path');

const zipFiles = (filenames, dst) => new Promise((resolve, reject) => {
  try {
    const archive = new AdmZip();
    if (filenames instanceof Array) {
      for (let e of filenames) {
        const s = statSync(e);
        if (s.isDirectory()) {
          archive.addLocalFolder(e);
        } else if (s.isFile()) {
          archive.addLocalFile(e);
        }
      }
      archive.writeZip(dst, (err) => {
        if (!err) {
          resolve(dst);
        } else {
          reject(err);
        }
      });
    } else if (typeof filenames === 'string') {
      const s = statSync(filenames);
      if (s.isDirectory()) {
        archive.addLocalFolder(filenames);
      } else if (s.isFile()) {
        archive.addLocalFile(filenames);
      }
      archive.writeZip(dst, (err) => {
        if (!err) {
          resolve(dst);
        } else {
          reject(err);
        }
      });
    } else {
      reject('the first argument `filenames` must be Array.');
    }
  } catch (e) {
    reject(e);
  }
});

const zipDir = (src, dst) => new Promise((resolve, reject) => {
  try {
    if (!statSync(src).isDirectory()) {
      reject(`[${src}] is not a directory.`);
    } else {
      if (dst.indexOf('.zip') !== dst.length - 4) {
        dst = join(dst, `${src.substring(src.lastIndexOf(sep) + 1)}.zip`);
      }
      zipFiles(src, dst).then(resolve).catch(reject);
    }
  } catch (e) {
    reject(e);
  }
});

module.exports = { zipDir, zipFiles };
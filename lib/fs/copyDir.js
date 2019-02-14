const { walk } = require('walk');
const { mkdirSync, copyFile } = require('fs');
const { join, sep, relative } = require('path');

const copyDir = (src, dst) => new Promise((resolve, reject) => {
  try {
    if (dst.lastIndexOf(sep) === dst.length - 1) {
      const src_dirs = src.split(sep);
      dst = join(dst, src_dirs[src_dirs.length - 1]);
    }
    mkdirSync(dst, { recursive: true });
    const options = {
      followLinks: false,
      filters: ['node_modules'],
      listeners: {
        directories: (root, dirStatsArray, next) => {
          for (let d of dirStatsArray) {
            let _dirpath = join(dst, relative(src, root), d.name);
            // console.log(`---- make directory: [${_dirpath}] ...`);
            mkdirSync(_dirpath);
          }
          next();
        },
        file: (root, fileStats, next) => {
          let _filepath = join(dst, relative(src, root), fileStats.name);
          // console.log(`---- copy file to: [${_filepath}] ...`);
          copyFile(join(root, fileStats.name), _filepath, next);
        },
        errors: (root, nodeStatsArray, next) => {
          next();
        },
        end: () => {
          resolve({
            message: `all files from ${src} has copied to ${dst} .`,
            time: new Date,
            src, dst
          });
        }
      }
    };
    walk(src, options);
  } catch (e) {
    reject(e);
  }
});

module.exports = copyDir;
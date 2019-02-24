
const { statSync } = require('fs');
const { join, sep } = require('path');
const sevenBin = require('7zip-bin');
const seven = require('node-7z');
const pathTo7zip = sevenBin.path7za;

const zipDir = (src, dst, {logger = console}) => new Promise((resolve, reject) => {
  try {
    if (!statSync(src).isDirectory()) {
      reject(`[${src}] is not a directory.`);
    } else {
      if (dst.indexOf('.7z') !== dst.length - 3) {
        dst = join(dst, `${src.substring(src.lastIndexOf(sep) + 1)}.7z`);
      }
      const arcStream = seven.add(dst, join(src, '*'), {
        recursive: true, $bin: pathTo7zip, $progress: true
      });
      arcStream.on('progress', (progress) => {
        logger.info(`[${progress.percent}] - ${progress.fileCount} files zipped.`);
      });
      arcStream.on('data', ({ file, status, attributes, size, sizeCompressed}) => {
        logger.info(`[${status}] - ${file}(${attributes}) ${size}->${sizeCompressed}.`);
      });
      arcStream.on('end', () => resolve(dst));
      arcStream.on('error', err => {
        logger.error(err);
        reject(err);
      });
    }
  } catch (e) {
    reject(e);
  }
});

module.exports = { zipDir };
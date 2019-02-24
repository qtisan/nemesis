
const moment = require('moment');
const bakup = require('../lib/fs/bakup');
const { scheduleJob } = require('node-schedule');
const l = require('./config/log4js').getLogger('SMOEC');

const bak = currentDate => {

  l.info(`${moment(currentDate).format('YYYY-MM-DD HH:mm:ss')} bakup.`);

  bakup({
    prodDir: 'D:\\tomb',
    bakupPath: 'D:\\tomb_file\\',
    bakupCount: 60,
    current: moment(),
    logger: l
  }).then((dst) => {
    l.info(`has bakup to path ${dst}`);
  }).catch((e) => {
    l.error(`error occured. ${e.message}`);
  });

};

if (process.argv[2] && process.argv[2] == 'now') {
  console.log('bak immediately.');
  bak(new Date());
} else {
  scheduleJob('* 10 2 * * *', bak );
}


const log4js = require('log4js');

log4js.configure({
  appenders: {
    SMOEC: { type: 'file', filename: 'examples/logs/smoec.log' }
  },
  categories: {
    default: { appenders: ['SMOEC'], level: 'info' }
  }
});

module.exports = log4js;

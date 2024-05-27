const pino = require('pino')

module.exports = pino({
  enabled: process.env.NODE_ENV !== 'test',
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:standard',
      singleLine: true
    }
  }
});

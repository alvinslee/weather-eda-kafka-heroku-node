require('dotenv').config();
const logger = require('./src/logger.js');
const kafka = require('./src/kafka.js');

(async () => {
  const consumer = await kafka.consumer()
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const sensorId = message.key.toString()
      const messageObj = JSON.parse(message.value.toString())
      const logMessage = { sensorId }
      logMessage[messageObj.reading] = messageObj.value
      logger.info(logMessage)
    }
  })
})()


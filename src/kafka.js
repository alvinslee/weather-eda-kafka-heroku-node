const { Kafka } = require('kafkajs');

const BROKER_URLS = process.env.KAFKA_URL.split(',').map(uri => uri.replace('kafka+ssl://','' ))
const TOPIC = `${process.env.KAFKA_PREFIX}weather-data`
const CONSUMER_GROUP = `${process.env.KAFKA_PREFIX}weather-consumers`

const kafka = new Kafka({
  clientId: 'weather-eda-app-nodejs-client',
  brokers: BROKER_URLS,
  ssl: {
     rejectUnauthorized: false,
     ca: process.env.KAFKA_TRUSTED_CERT,
     key: process.env.KAFKA_CLIENT_CERT_KEY,
     cert: process.env.KAFKA_CLIENT_CERT,
  },
})

const producer = async () => {
  const p = kafka.producer()
  await p.connect()
  return p;
}

const consumer = async () => {
  const c = kafka.consumer({
    groupId: CONSUMER_GROUP,
    sessionTimeout: 30000
  })
  await c.connect()
  await c.subscribe({ topics: [TOPIC] });
  return c;
}

module.exports = {
  producer,
  consumer,
  topic: TOPIC,
  groupId: CONSUMER_GROUP
};

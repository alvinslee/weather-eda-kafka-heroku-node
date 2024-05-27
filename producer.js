require('dotenv').config();
const kafka = require('./src/kafka.js');
const { faker } = require('faker');

const SENSORS = ['sensor01','sensor02','sensor03','sensor04','sensor05'];
const MAX_DELAY_MS = 20000;
const READINGS = ['temperature','humidity','barometric_pressure'];
const MAX_TEMP = 130;
const MIN_PRESSURE = 2910;
const PRESSURE_RANGE = 160;

const getRandom = (arr) => arr[faker.number.int(arr.length - 1)];

const getRandomReading = {
  temperature: () => faker.number.int(MAX_TEMP) + (faker.number.int(100) / 100),
  humidity: () => faker.number.int(100) / 100,
  barometric_pressure: () => (MIN_PRESSURE + faker.number.int(PRESSURE_RANGE)) / 100
};

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

(async () => {
  const producer = await kafka.producer()

  while(true) {
    const sensor = getRandom(SENSORS)
    const reading = getRandom(READINGS)
    const value = getRandomReading[reading]()
    const data = { reading, value }
    await producer.send({
      topic: kafka.topic,
      messages: [{
        key: sensor,
        value: JSON.stringify(data)
      }]
    })
    await sleep(faker.number.int(MAX_DELAY_MS))
  }
})()


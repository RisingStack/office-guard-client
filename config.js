var config = {};
module.exports = config;

config.ports = {
  ambient: 'B',
  climate: 'C',
  accelerometer: 'A'
};

// possible options for temperature scales: 'c' (Celsius) or 'f' (Fahrenheit)
config.climate = {
  scale: 'c'
};

config.server = {
  port: 3000
};

config.alerts = {
  interval: 15 * 1000, //check them every 15 seconds
  temperature: {
    gt: 20,
    lt: 30
  },
  lightLevel: {
    gt: 0.01,
    lt: 0.5
  },
  soundLevel: {
    gt: 0.01,
    lt: 0.1
  },
  humidity: {
    gt: 20,
    lt: 60
  }
};

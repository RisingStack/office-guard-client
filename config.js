var config = {};
module.exports = config;

config.ports = {
  ambient: 'B',
  climate: 'A',
  accelerometer: 'D'
};

// possible options for temperature scales: 'c' (Celsius) or 'f' (Fahrenheit)
config.climate = {
  scale: 'c'
};

config.server = {
  port: 3000
};

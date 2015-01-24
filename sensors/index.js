var accelerometerSensor = require('./accelerometer');
var ambientSensor = require('./ambient');
var climateSensor = require('./climate');

var async = require('async');

function onError (err) {
  console.log(err);
}

function locationChanged (xyz) {
  console.log(xyz);
}

function getAllValues (done) {
  async.parallel({
    lightLevel: getLightLevel,
    soundLevel: getSoundLevel,
    temperature: readTemperature,
    humidity: readHumidity,
    acceleration: getAcceleration
  }, done)
}

function getLightLevel (done) {
  ambientSensor.getLightLevel(done);
}

function getSoundLevel (done) {
  ambientSensor.getSoundLevel(done);
}

function readTemperature (done) {
  climateSensor.readTemperature(done);
}

function readHumidity (done) {
  climateSensor.readHumidity(done);
}

function getAcceleration (done) {
  accelerometerSensor.getAcceleration(done);
}

// Bootstrapping all the module
function init (done) {
  async.parallel([
    function (cb) {
      ambientSensor.init({
        onError: onError
      }, cb);
    },
    function (cb) {
      climateSensor.init({
        onError: onError
      }, cb);
    },
    function (cb) {
      accelerometerSensor.init({
        onError: onError,
        onData: locationChanged
      }, cb);
    }
  ], function (err) {
    if (err) {
      throw err;
    }

    console.log('All the sensors are ready');

    return done(null);
  });
}

module.exports.init = init;

// from the ambient module
module.exports.getLightLevel = getLightLevel;
module.exports.getSoundLevel = getSoundLevel;

// from the climate module
module.exports.readTemperature = readTemperature;
module.exports.readHumidity = readHumidity;

// from all the modules
module.exports.getAllValues = getAllValues;

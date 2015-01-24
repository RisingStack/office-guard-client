var ambientSensor = require('./ambient');

var async = require('async');

function onError (err) {
  console.log(err);
}

function getAllValues (done) {
  async.parallel({
    lightLevel: getLightLevel,
    soundLevel: getSoundLevel
  }, done)
}

function getLightLevel (done) {
  ambientSensor.getLightLevel(done);
}

function getSoundLevel (done) {
  ambientSensor.getSoundLevel(done);
}


// Bootstrapping all the module
function init (done) {
  async.parallel([
    function (cb) {
      ambientSensor.init({
        onError: onError
      }, cb);
    }
  ], function (err) {
    if (err) {
      throw err;
    }

    console.log('Init of sensors are finished');
    return done(null);
  });
}

module.exports.init = init;

// from the ambient module
module.exports.getLightLevel = getLightLevel;
module.exports.getSoundLevel = getSoundLevel;

// from all the modules
module.exports.getAllValues = getAllValues;

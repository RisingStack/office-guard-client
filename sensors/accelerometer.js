var tessel = require('tessel');
var accelerometerlib = require('accel-mma84');

var config = require('../config');
var accelerometer = accelerometerlib.use(tessel.port[config.ports.ambient]);

function init (options, done) {
  accelerometer.on('ready', function () {

    module.exports.getSoundLevel = accelerometer.getAcceleration.bind(this);

    return done ();
  });
  accelerometer.on('data', options.onData);
  accelerometer.on('error', options.onError);
}

module.exports.init = init;

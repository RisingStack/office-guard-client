var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var config = require('../config');
var ambient = ambientlib.use(tessel.port[config.ports.ambient]);

function init (options, done) {
  ambient.on('ready', function () {

    module.exports.getSoundLevel = ambient.getSoundLevel.bind(this);
    module.exports.getLightLevel = ambient.getLightLevel.bind(this);

    return done ();
  });
  ambient.on('error', options.onError);
}

module.exports.init = init;

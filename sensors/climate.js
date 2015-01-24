var tessel = require('tessel');
var climatelib = require('climate-si7020');

var config = require('../config');
var climate = climatelib.use(tessel.port[config.ports.climate]);

function init (options, done) {
  climate.on('ready', function () {

    var _this = this;

    module.exports.readTemperature = function (cb) {
      climate.readTemperature.call(_this, config.climate.scale, cb);
    };
    module.exports.readHumidity = climate.readHumidity.bind(_this);

    return done ();
  });
  climate.on('error', options.onError);
}

module.exports.init = init;

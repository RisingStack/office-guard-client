var https = require('https');
var util = require('util');

var config = require('../config');

// store inital values here
var x;
var y;
var z;

function sendAlert (property, value) {
  console.log('Sending alert... %s : %s', property, value);
  var message = 'OfficeGuard Alert! ' + property + ' reached value: ' + value;

  https.get(util.format('https://%s/v1/json/alert?&message=%s', config.OfficeGuardServer.url,  message), function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk);
    });
  });
}

function compare(gt, lt, value) {
  if (value < gt) {
    return false;
  }

  if (value > lt) {
    return false;
  }

  return true;
}

function checkValues(sensors) {
  var thresholds = config.alerts;

  sensors.getAllValues(function (err, values) {
    if (err) {
      return console.log(err);
    }

    for (var key in values) {
      if (thresholds.hasOwnProperty(key)) {
        if (!compare(thresholds[key].gt, thresholds[key].lt, values[key])) {
          sendAlert(key, values[key]);
        }
      }
    }

  });
}

function init(options) {
  var sensors = options.sensors;
  var checkInterval = config.alerts.interval;

  setInterval(function () {
    checkValues(sensors);
  }, checkInterval);
}

module.exports = init;
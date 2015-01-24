var https = require('https');

var config = require('../config');

// store inital values here
var x;
var y;
var z;

function sendAlert (property, value) {
  console.log('Sending alert... %s : %s', property, value);
  var payload = {
    apiKey: '1d3ee033-914c-49e5-8876-1c12f88be761',
    message: 'OfficeGuard Alert! ' + property + ' reached value: ' + value
  };

  var options = {
    host: 'api.opsgenie.com',
    path: '/v1/json/alert',
    method: 'POST',
    port: 443,
    rejectUnauthorized: false
  };

  var request = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk);
    });
  });

  request.on('error', function (err) {
    //todo: proper error handling
    console.log(err);
  });

  request.write(JSON.stringify(payload));
  request.end();
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
  var tresholds = config.alerts;

  sensors.getAllValues(function (err, values) {
    if (err) {
      return console.log(err);
    }

    for (var key in values) {
      if (tresholds.hasOwnProperty(key)) {
        if (!compare(tresholds[key].gt, tresholds[key].lt, values[key])) {
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
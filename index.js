var sensors = require('./sensors');
var server = require('./server');

var config = require('./config');

sensors.init(function (err) {
 if (err) {
   throw err;
 }

  server({
    sensors: sensors
  }).listen(config.server.port, function (err) {
    if (err) {
      throw (err);
    }

    console.log('Office-guard is up and running!');
  });
});

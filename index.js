var sensors = require('./sensors');
var server = require('./server');
var alerts = require('./alerts');

var config = require('./config');

sensors.init(function (err) {
 if (err) {
   throw err;
 }

  alerts({
    sensors: sensors
  });

  //server({
  //  sensors: sensors
  //}).listen(config.server.port, function (err) {
  //  if (err) {
  //    throw (err);
  //  }
  //
  //  console.log('Office-guard is up and running!');
  //});
});

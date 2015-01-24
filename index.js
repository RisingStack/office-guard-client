var sensors = require('./sensors');
var server = require('./server');

sensors.init(function (err) {
 if (err) {
   throw err;
 }

  server({
    sensors: sensors
  }).listen(3000, function (err) {
    if (err) {
      throw (err);
    }

    console.log('Office-guard is up and running!');
  });
});

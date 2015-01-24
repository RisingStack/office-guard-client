var http = require('http');

function init (options) {
  var sensors = options.sensors;

  var server = http.createServer(function (request, response) {
    sensors.getAllValues(function(err, values) {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify(values));
    });
  });

  return server;
}

module.exports = init;

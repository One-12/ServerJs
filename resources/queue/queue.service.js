var bull = require('bull');
var config = require('../../config.json');

exports.produce = function(queueName, data){
  bull(queueName, {
    redis: {
      port: config.job.port,
      host: config.job.host,
    }
  }).add(data);
}
var bull = require('bull');

exports.produce = function(queueName, data){
  bull(queueName, {
    redis: {
      port: config.job.port,
      host: config.job.host,
      password: config.job.password
    }
  }).add(data);
}
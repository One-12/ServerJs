const bull = require('bull');
const config = require('../../config.json');

exports.produce = async (queueName, data) => {
  const queue = bull(queueName, {
    redis: {
      port: config.job.port,
      host: config.job.host,
    },
  });
  await queue.add(data);
};

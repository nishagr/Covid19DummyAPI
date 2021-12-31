const debug = require('debug')('debug');
const { createClient } = require('redis');

const client = createClient({ url: 'redis://redis:6379' });

client.on('error', (err) => debug('Redis Client Error', err));

(async () => {
  await client.connect();
})();

exports.client = client;

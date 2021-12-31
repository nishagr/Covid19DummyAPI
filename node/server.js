/* eslint-disable no-fallthrough */
require('dotenv').config();
const http = require('http');
const debug = require('debug')('debug');
const app = require('./app');

const server = http.createServer(app);

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  // Default Port is 8000
  if (Number.isNaN(port)) return 8000;
  if (port >= 0 && port < 65536) return port;
  return val;
};

const hostname = '127.0.0.1';
const port = normalizePort(process.env.PORT);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`;
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

const onListening = () => {
  debug(`Server running at http://${hostname}:${port}/`);
};

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
app.set('port', port);

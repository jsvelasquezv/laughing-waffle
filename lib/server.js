'use-strict'

const config = require('./config');
const app = require('./app');
const http = require('http');

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}

app.use(allowCrossDomain);
app.set('port', config.port);

let server = http.createServer(app);
server.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

function onError(err) {
  console.log('Error: ', err);
}


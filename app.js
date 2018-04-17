const express = require('express');
const app = express();
const server = require('http').Server(app);

const compression = require('compression');
const helmet = require('helmet');

const SERVER_PORT = 8080;

app.enable('trust proxy');
app.use(helmet());
app.use(compression());

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.all('*', (req, res) => {
  res.statusCode = 404;
  res.sendFile(__dirname + '/public/index.html');
});

app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(process.env.PORT || SERVER_PORT, () => {
  console.log('Express server listening on port %d in %s mode.', SERVER_PORT, app.get('env'));
});

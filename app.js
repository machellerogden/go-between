var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app);

// global socket.io instance
global.io = require('socket.io').listen(server);
global.io.set('log level', 1);
global.io.set('transports', [ 'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

app.root = __dirname;

require(app.root + '/app/config')(app);
require(app.root + '/app/server/router')(app);
require(app.root + '/app/server/modules/gb-events');

// start server
server.listen(8080);


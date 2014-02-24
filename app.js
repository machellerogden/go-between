var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app);

// global socket.io instance
global.io = require('socket.io').listen(server);

app.root = __dirname;

require(app.root + '/app/config')(app);
require(app.root + '/app/server/router')(app);
require(app.root + '/app/server/modules/gb-events');

// start server
server.listen(3333);


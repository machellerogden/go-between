/**
 * go-between tools
 *
 */

var _ = require('underscore'),
    async = require('async'),
    request = require('request'),
    dns = require('dns'),
    moment = require('moment'),
    gbTools = {};

gbTools.connect = function () {
    var socket = this;
    socket.connected = true;
    socket.emit('connected');
};

gbTools.disconnect = function () {
    var socket = this;
    socket.connected = false;
};

module.exports = gbTools;

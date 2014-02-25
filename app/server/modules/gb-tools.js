/**
 * go-between tools
 *
 */

var _ = require('underscore'),
    async = require('async'),
    request = require('request'),
    dns = require('dns'),
    moment = require('moment'),
    gbTools = {},
    questions = [{  // fixture
        id : 1,
        question : 'Which weighs more, a ton of bricks or a ton of feathers?',
        votes : 123,
        answered : false,
        status : 'pending'
    }, {
        id : 2,
        question : "What color is George Washington's white horse?",
        votes : 2,
        answered : false,
        status : 'approved'
    }];

gbTools.connected = function() {
    var socket = this;
    socket.connected = true;

    // TODO wire-up mongoDB
    socket.emit('posted', questions);
};

gbTools.post = function(question) {
    var socket = this;
    // TODO wire-up mongoDB
    questions.push({
        id : questions.length + 1,
        question : question,
        votes : 1,
        answered : false
    });

    socket.emit('posted', questions);
};

gbTools.like = function(id) {
    var socket = this;

    for (var i=0; i<questions.length; i++) {
        if (questions[i].id == id) {
            questions[i].votes++;

            break;
        }
    }
    socket.emit('posted', questions);
};

gbTools.update = function(data) {
    var socket = this;
    console.log('update', data);
    socket.emit('posted', questions);
    // socket.broadcast.emit('posted', questions);
};

gbTools.disconnect = function() {
    var socket = this;
    socket.connected = false;
};

module.exports = gbTools;

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
    questions = [{
        id : 0,
        question : 'What weighs more, a ton of bricks or a ton of feathers?',
        votes : 123,
        answered : false
    }, {
        id : 1,
        question : "What color is George Washington's white horse?",
        votes : 2,
        answered : false
    }];

/**
 * Connect to...
 */
gbTools.connect = function() {
    var socket = this;
    socket.connected = true;

    console.log('connected');

    // TODO wire-up mongoDB
    socket.emit('connected', questions);
};

/**
 * Post new question
 *
 * @param {Object} question
 */
gbTools.post = function(question) {
    var socket = this;
    // TODO wire-up mongoDB
    questions.push({
        id : questions.length,
        question : question,
        votes : 1,
        answered : false
    });

    socket.emit('posted', questions);
    // socket.broadcast.emit('posted', questions);
};

/**
 * Like question
 */
gbTools.like = function(id) {
    var socket = this;

    console.log('will like', id);

    for (var i=0; i<questions.length; i++) {
        if (questions[i].id == id) {
            questions[i].votes++;

            break;
        }
    }

    socket.emit('posted', questions);
    // socket.broadcast.emit('posted', questions);
};

/**
 * Disconnect from...
 */
gbTools.disconnect = function() {
    var socket = this;
    socket.connected = false;
};

module.exports = gbTools;

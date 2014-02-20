/**
 * go-between events
 *
 */

module.exports = function(){

    var gbTools = require('./gb-tools');

    global.io.of('/gb').on('connection', function (socket) {
        socket.on('connect', gbTools.connect);
        socket.on('disconnect', gbTools.disconnect);
    });

}();

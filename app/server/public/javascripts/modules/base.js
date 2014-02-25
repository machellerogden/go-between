define(['can', 'domReady!'], function(can) {
    return can.Control.extend({
        defaults : {
            questions : null
        }
    }, {
        init : function(el, op) {
            op.questions = new can.List([]);

            this.socket = io.connect('/gb');

            this.socket.on('connect', function() {
                console.debug('connect');
                this.socket.emit('connected');
            });

            this.socket.on('connected', function(data) {
                console.debug('connected', data);
                op.questions.attr(data, true);
            });

            this.socket.on('posted', function(data) {
                console.debug('posted', data);
                op.questions.attr(data, true);
            });
        }
    });
});

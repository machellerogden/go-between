define(['can', 'domReady!'], function(can) {
    var _this;
    return can.Control.extend({
        defaults : {
            questions : null
        }
    }, {
        init : function(el, op) {
            _this = this;

            op.questions = new can.List([]);

            _this.socket = io.connect('/gb');

            _this.socket.on('connect', function() {
                setTimeout(function() { // hack!!!
                    _this.socket.emit('connected');
                }, 10);
            });

            _this.socket.on('posted', function(data) {
                op.questions.attr(data, true);
            });
        }
    });
});

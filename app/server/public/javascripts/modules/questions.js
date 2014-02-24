define(['can', 'domReady!'], function(can) {
    var socket;

    return can.Control.extend({
        defaults : {
            view : '/javascripts/templates/questions.mustache',
            questions : null,
            characterLimit : 250
        }
    }, {
        init : function(el, op) {
            op.questions = new can.List([]);

            socket = io.connect('/gb');

            socket.on('posted', function(data) {
                op.questions.attr(data, true);
            });

            socket.on('connect', function() {
                socket.emit('connected');
            });

            socket.on('connected', function(data) {
                op.questions.attr(data, true);
            });

            op.count = can.compute(op.characterLimit);

            el.html(can.view(op.view, {
                questions : op.questions,
                count : op.count
            }));
        },
        'form submit' : function(el, ev) {
            ev.preventDefault();
            // this.options.questions.push(question);

            if ($(el).find('[name=question]').val()) {
                socket.emit('post', $(el).find('[name=question]').val());
            }

            $(el).find('[name=question]').val('');
        },
        '[name=question] keyup' : function(el, ev) {
            this.options.count(this.options.characterLimit - el.val().length);
        },
        '[name=question] change' : function(el, ev) {
            this.options.count(this.options.characterLimit);
        },
        '.like click' : function(el, ev) {
            ev.preventDefault();
            socket.emit('like', el.attr('href').replace('#', ''));
        }
    });
});

define(['can', 'modules/base', 'can/construct/super', 'domReady!'], function(can, base) {

    return base({
        defaults : {
            view : '/javascripts/templates/questions',
            characterLimit : 250
        }
    }, {
        init : function(el, op) {
            this._super(el, op);

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
                this.socket.emit('post', $(el).find('[name=question]').val());
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
            this.socket.emit('like', el.attr('href').replace('#', ''));
        }
    });
});

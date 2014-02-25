define(['can', 'modules/base', 'can/construct/super', 'domReady!'], function(can, base) {
    return base({
        defaults : {
            view : '/javascripts/templates/moderator'
        }
    }, {
        init : function(el, op) {
            this._super(el, op);

            el.html(can.view(op.view, {
                questions : op.questions
            }));
        },
        'button click' : function(el, ev) {
            ev.preventDefault();

            this.socket.emit('update', {
                id : el.val(),
                status : (el.text() === 'Approve') ? 'approved' : 'rejected'
            });
        },
    });
});

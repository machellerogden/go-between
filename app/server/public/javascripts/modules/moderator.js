define(['can', 'domReady!'], function(can) {
    return can.Control.extend({
        defaults : {
            view : '/javascripts/templates/moderator.mustache',
            questions : null
        }
    }, {
        init : function(el, op) {
            op.questions = new can.List([{
                id : 1,
                question : 'What weighs more, a ton of bricks or a ton of feathers?',
                votes : 123,
                answered : false
            }, {
                id : 2,
                question : "What color is George Washington's white horse?",
                votes : 2,
                answered : false
            }]);

            el.html(can.view(op.view, {
                questions : op.questions
            }));
        },
        'button[name=approve] click' : function(el, ev) {
            ev.preventDefault();

            // TODO
            console.log('will approve', el.val());
        },
        'button[name=reject] click' : function(el, ev) {
            ev.preventDefault();

            // TODO
            console.log('will reject', el.val());
        }
    });
});

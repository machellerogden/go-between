define(['can', 'domReady!'], function(can){
    return can.Control.extend({
        defaults :{
            view : '/javascripts/templates/questions.mustache'
        }
    }, {
        init : function(el, op) {
            el.html(can.view(op.view, {}));
        }
    });
});

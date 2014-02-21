require.config({
    paths : {
        jquery : '/javascripts/libs/jquery-2.1.0.min',
        can : '/javascripts/libs/can',
        domReady : '/javascripts/libs/require/domReady'
    },
    shim : {
        can : ['jquery'],
    }
});

require(['modules/questions'], function(Questions) {
    new Questions('#questions');
});

/**
 * @author Nate Johnson
 */

require(['modules/questions', 'modules/moderator'], function(Questions, Moderator) {

    $('#questions').each(function(i, el) {
        new Questions(el);
    });

    $('#moderator').each(function(i, el) {
        new Moderator(el);
    });
});

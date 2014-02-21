/**
 * @author Nate Johnson
 */

require(['modules/questions', 'modules/moderator'], function(Questions, Moderator) {
    new Questions('#questions');
    new Moderator('#moderator');
});

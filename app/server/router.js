module.exports = function(app) {

    /**
     * params
     *
     */

    app.param('roomId', function(req, res, next, value){
        if (value) {
            req.roomId = value;
            next();
        } else {
            next(new Error('failed to set roomId'));
        }
    });

    /**
     * routes
     *
     */

    // all routes
    app.all('/*', function (req, res, next) {
        // CORS headers
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
        res.header('Access-Control-Request-Method','GET,POST');
        next();
    });

    // site root
    app.get('/', function (req, res) {
        res.render('start', { title: 'go-between' });
    });

    // terms of service
    app.get('/tos', function(req, res) {
        res.render('tos', { title: 'go-between' });
    });

    // meeting room
    app.get('/room/:roomId', function(req, res) {
        res.render('room', { title: 'go-between', domain: req.roomId });
    });

    // moderator
    app.get('/moderator', function(req, res) {
        res.render('moderator', { title: 'go-between - MODERATOR' });
    });

};

module.exports = function(app) {

    var express = require('express'),
        connect = require('connect'),
        stylus = require('stylus'),
        nib = require('nib'),
        cookie = require('cookie');

    // global session store
    global.sessionStore = new connect.session.MemoryStore();

    // io configuration
    global.io.set('log level', 1);
    global.io.set('transports', [ 'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
    global.io.set('authorization', function (data, accept) {
        if (!data.headers.cookie) {
            return accept('Session cookie required.', false);
        }
        data.cookie = cookie.parseCookie(data.headers.cookie);
        data.cookie = cookie.parseSignedCookies(data.cookie, 'f1$ZOxIEi7*SDuzc');
        data.sessionID = data.cookie['express.sid'];
        global.sessionStore.get(data.sessionID, function (err, session) {
            if (err) {
                return accept('Error in session store.', false);
            } else if (!session) {
                return accept('Session not found.', false);
            }
            // success! we're authenticated with a known session.
            data.session = session;
            return accept(null, true);
        });
    });

    // app configuration
    app.configure(function(){
        app.set('port', process.env.PORT || 8080);
        app.set('views', app.root + '/app/server/views');
        app.set('view engine', 'jade');
        app.use(express.favicon(app.root + '/app/server/public/favicon.ico'));
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser('f1$ZOxIEi7*SDuzc'));
        app.use(express.session({ key: 'express.sid', store: global.sessionStore }));
        app.use(app.router);
        app.use(stylus.middleware({
            src: app.root + '/app/server/public',
            dest: app.root + '/app/server/public',
            debug: true,
            compile: function (str, path) {
                return stylus(str)
                    .set('filename', path)
                    .set('compress', true)
                    .use(nib());
            }
        }));
        app.use(express.static(app.root + '/app/server/public'));
    });

    // development configuration
    app.configure('development', function(){
        app.use(express.errorHandler());
    });

};

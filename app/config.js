module.exports = function(app) {

    const KEY = 'express.sid',
          SECRET = 'express';

    var express = require('express'),
        stylus = require('stylus'),
        nib = require('nib'),
        cookie = express.cookieParser(SECRET);

    // global session store
    global.sessionStore = new express.session.MemoryStore();

    // global session store
    global.session = express.session({ secret: SECRET, key: KEY, store: sessionStore });

    // app configuration
    app.configure(function(){
        app.set('port', process.env.PORT || 8080);
        app.set('views', app.root + '/app/server/views');
        app.set('view engine', 'jade');
        app.use(express.favicon(app.root + '/app/server/public/favicon.ico'));
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(cookie);
        app.use(session);
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
        app.use(function noCachePlease(req, res, next) {
            if (req.url === '/') {
                res.header("Cache-Control", "no-cache, no-store, must-revalidate");
                res.header("Pragma", "no-cache");
                res.header("Expires", 0);
            }
            next();
        });
        app.use(express.static(app.root + '/app/server/public'));
    });

    // development configuration
    app.configure('development', function(){
        app.use(express.errorHandler());
    });

    // io configuration
    global.io.set('log level', 1);
    global.io.set('transports', [ /*'websocket', 'flashsocket', 'htmlfile', */ 'xhr-polling', 'jsonp-polling']);
    /*
    global.io.set('authorization', function(data, accept) {
      cookie(data, {}, function(err) {
        if (!err) {
          var sessionID = data.signedCookies[KEY];
          global.sessionStore.get(sessionID, function(err, session) {
            if (err || !session) {
              accept(null, false);
            } else {
              data.session = session;
              accept(null, true);
            }
          });
        } else {
          accept(null, false);
        }
      });
    });
    */
};

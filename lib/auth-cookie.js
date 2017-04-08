'use strict';

// Load modules

const Users = require('./users.json');


// Declare internals

const internals = {};


exports.register = function (server, options, next) {

    // Code inside the callback function of server.dependency will only be
    // executed after hapi-auth-basic has been registered.  It's triggered by
    // server.start, and runs before actual starting of the server.  It's done because
    // the call to server.auth.strategy upon registration would fail and make the
    // server crash if the basic scheme is not previously registered by hapi-auth-basic.
    server.dependency('hapi-auth-cookie', internals.after);

    return next();
};

exports.register.attributes = {
    name: 'AuthCookie'
};


internals.after = function (server, next) {

    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', true, {
        password: 'y00y-00m3-m4k1-z00m-y00y-00m3-m4k1-z00m-',
        cookie: 'sid-example',
        redirectTo: '/login',
        isSecure: true,
        validateFunc: function (request, session, callback) {

            cache.get(session.sid, (err, cached) => {

                if (err) {
                    return callback(err, false);
                }

                if (!cached) {
                    return callback(null, false);
                }

                return callback(null, true, cached.account);
            });
        }
    });

    return next();
};


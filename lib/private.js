'use strict';

// Load modules
const Users = require('./users.json');

// Declare internals

const internals = {
    startHtml: '<head><title>University</title></head><body>Hello, ',
    endHtml: '</body>'
};

internals.validate = function (request, username, password, callback) {

    const user = Users[username];
    if (!user || user.password !== password) {
        return callback(null, false);
    }
    return callback(null, true, { id: user.id, name: user.name });
};

exports.register = function (server, options, next) {

    server.auth.strategy('simple', 'basic', { validateFunc: internals.validate });

    server.route({
        method: 'GET',
        path: '/private',
        config: {
            auth: 'simple',
            description: 'Private page for authorized users',
            handler: function (request, reply) {

                return reply(internals.startHtml + request.auth.credentials.name + internals.endHtml);
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'private'
};

'use strict'

const Package = require('../package.json');

const internals = {
    response: {
        version: Package.version
    }
};

internals.init = function (server) {

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: function (request, reply) {

              return reply(internals.response);
            }
        }
    });
};

exports.register = function (server, options, next) {
    
    internals.init(server);
    next();
};

exports.register.attributes = {
    name: 'version'
};

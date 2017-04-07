'use strict';

// Declare internals

const internals = {};


exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/private',
        config: {
            auth: 'basic',
            description: 'Returns a greeting message to the authenticated user',
            handler: function (request, reply) {

                const html = '<div>Hello ' + request.auth.credentials.username + '</div>';
                return reply(html);
            }
        }
    });

    return next();
};


exports.register.attributes = {
    name: 'Private'
};

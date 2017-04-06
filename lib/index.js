const Hapi = require('hapi');
const Package = require('../package.json');

const internals = {
    answer: {
        version: Package.version
    }
};

internals.init = function () {

    const server = new Hapi.Server();
    server.connection({
        host: 'localhost',
        port: process.env.PORT || 8000
    });

    server.route({
        method: 'GET',
        path: '/version',
        handler: function (request, reply) {
            
            return reply(internals.answer);
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
};

internals.init();
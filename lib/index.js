'use strict';

// Load modules

const Glue = require('glue');

// Declare internals

const internals = {};


exports.init = function (manifest, options, next) {

    Glue.compose(manifest, options, (err, server) => {

        if (err) {
            return next(err);
        }

        server.select('web').ext('onRequest', (request, reply) => {

            return reply.redirect('https://localhost:8001' + request.url.path).permanent();
        });

        server.start((err) => {

            return next(err, server);
        });
    });
};

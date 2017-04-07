'use strict';

// Load modules

const Hapi = require('hapi');
const Version = require('./version');

const internals = {};

exports.init = function (port, callback) {

    const server = new Hapi.Server();
    server.connection({ port });
    server.register(Version, (err) => {

        if (err) {
            return callback(err);
        }

        server.start((err) => {

            return callback(err, server);
        });
    });
};

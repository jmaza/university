'use strict';

// Load modules

const Basic = require('hapi-auth-basic');
const Hapi = require('hapi');
const Private = require('./private');
const Version = require('./version');


// Declare internals

const internals = {};


exports.init = function (port, next) {

    const server = new Hapi.Server();
    server.connection({ port });
    server.register([Basic, Private, Version], (err) => {

        if (err) {
            return next(err);
        }

        server.start((err) => {

            return next(err, server);
        });
    });
};

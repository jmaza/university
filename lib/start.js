'use strict';

// Load modules

const Hoek = require('hoek');
const Server = require('./index');


// Declare internals

const internals = {};

internals.manifest = {
    connections: [
        {
            port: 8000
        }
    ],
    registrations: [
        {
            plugin: './version'
        },
        {
            plugin: './private'
        },
        {
            plugin: './home'
        }
    ]
}

internals.options = {
    relativeTo: __dirname
};

Server.init(internals.manifest, internals.options, (err, server) => {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});

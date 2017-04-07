'use strict';

// Load modules

const Config = require('./config.js');
const Hoek = require('hoek');
const Server = require('./index');


// Declare internals

const internals = {};

internals.manifest = {
    connections: [
        {
            port: 8000,
            labels: ['web']
        },
        {
            host: 'localhost',
            port: 8001,
            labels: ['web-tls'],
            tls: Config.tls
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
        },
        {
            plugin: './auth'
        },
        {
            plugin: 'hapi-auth-basic'
        },
        {
            plugin: 'vision'
        }
    ]
};

internals.composeOptions = {
    relativeTo: __dirname
};

Server.init(internals.manifest, internals.composeOptions, (err, server) => {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.select('web-tls').info.uri);
});

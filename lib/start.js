'use strict';

// Load modules

const Hoek = require('hoek');
const Server = require('./index');
const Config = require('./config');


// Declare internals

const internals = {};

internals.manifest = {
    connections: [
        {
            host: 'localhost',
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
            plugin: 'crumb',
        },
        {
            plugin: './version',
            options: {
                select: ['web', 'web-tls']
            }
        },
        {
            plugin: './private',
            options: {
                select: ['web', 'web-tls']
            }
        },
        {
            plugin: './home',
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: './api/user',
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: './auth'
        },
        {
            plugin: './auth-cookie',
            options: {
                select: ['web-tls']
            }
        },
        {
            plugin: 'hapi-auth-basic'
        },
        {
            plugin: 'hapi-auth-cookie'
        },
        {
            plugin: 'vision'
        },
        {
            plugin: 'inert'
        },
        {
            plugin: 'lout'
        },
        {
            plugin: {
                register: 'good',
                 options: {
                    ops: {
                        interval: 1000
                    },
                    reporters: {
                         myConsoleReporter: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ log: '*', response: '*' }]
                        }, {
                            module: 'good-console'
                        }, 'stdout'],
                        myFileReporter: [{
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ ops: '*' }]
                        }, {
                            module: 'good-squeeze',
                            name: 'SafeJson'
                        }, {
                            module: 'good-file',
                            args: ['./test/fixtures/awesome_log']
                        }]
                    }
                }
            },
             options: {
                select: ['web-tls']
            }
        }
    ]
};

internals.composeOptions = {
    relativeTo: __dirname
};

Server.init(internals.manifest, internals.composeOptions, (err, server) => {

    Hoek.assert(!err, err);

    // Server connections
    const web = server.select('web');
    const webTls = server.select('web-tls');


    // Logging started server
    console.log('Web server started at: ' + web.info.uri);
    console.log('WebTLS server started at: ' + webTls.info.uri);
});

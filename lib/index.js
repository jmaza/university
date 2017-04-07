'use strict';

// Load modules

const Glue = require('glue');
const Hapi = require('hapi');
const Version = require('./version');
const Private = require('./private');


// Declare internals

const internals = {};


exports.init = function (manifest, options, next) {

    Glue.compose(manifest, options, (err, server) => {

        if (err) {
            return next(err);
        }

        server.start((err) => {

            return next(err, server);
        });
    });
};

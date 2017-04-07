'use strict';

// Load modules
const Handlebars = require('handlebars');

// Declare internals

const internals = {
    title: 'My home page'
};


exports.register = function (server, options, next) {

    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: '../views'
    });

    server.route({
        method: 'GET',
        path: '/home',
        handler: {
            view: {
                template: 'home',
                context: {
                    title: internals.title
                }
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'home'
};

'use strict';

// Load modules
const Handlebars = require('handlebars');
const Vision = require('vision');

// Declare internals

const internals = {
    title: 'My home page'
};


exports.register = function (server, options, next) {
    server.register(Vision, (err) => {

        if (err) {
            return next(err);
        }

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
    });
};

exports.register.attributes = {
    name: 'home'
};

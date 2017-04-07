'use strict';

// Load modules

const Users = require('./users.json');


// Declare internals

const internals = {};


internals.validateFunc = function (request, username, password, callback) {

    const user = Users[username];
    if (!user || user.password !== password) {
        return callback(null, false);
    }

    user.username = username;

    return callback(null, true, user);
};


exports.register = function (server, options, next) {

    server.auth.strategy('basic', 'basic', { validateFunc: internals.validateFunc });

    return next();
};


exports.register.attributes = {
    name: 'Auth'
};

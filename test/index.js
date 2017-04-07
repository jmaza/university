'use strict';

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Version = require('../lib/version');

const internals = {};

const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;

it('starts server successfully on correct port', (done) => {

    University.init(9999, (err, server) => {

        expect(err).to.not.exist();
        expect(server.info.port).to.equal(9999);
        server.stop(done);
    });
});

it('registers plugins successfully', { parallel: false }, (done) => {

    const testPlugin = {};
    testPlugin.register = function (server, options, next) {

        return next();
    };

    testPlugin.register.attributes = { name: 'testplugin' };

    University.init(0, (err, server) => {

        expect(err).to.not.exist();
        server.register(testPlugin, (err) => {

            expect(server.registrations.hasOwnProperty(Version.register.attributes.name)).to.equal(true);
            expect(err).to.not.exist();

            done();
        });

    });
});

it('handles register plugin errors', { parallel: false }, (done) => {

    const orig = Version.register;

    Version.register = function (server, options, next) {

        Version.register = orig;
        return next(new Error('register version failed'));
    };

    Version.register.attributes = {
        name: 'fake version'
    };

    University.init(0, (err, server) => {

        expect(err).to.exist();
        expect(err.message).to.equal('register version failed');

        done();
    });
});

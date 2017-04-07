'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const University = require('../lib');
const Users = require('../lib/users.json');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

// Internals

const internals = {};

internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};


describe('/private', () => {

    it('validates authenticated user and returns correct welcome message', (done) => {

        University.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = { method: 'GET', url: '/private', headers: { authorization: internals.header('jose', Users.jose.password) } };
            server.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(200);
                expect(res.result, 'result').to.equal('<head><title>University</title></head><body>Hello, Jose Maza</body>');

                server.stop(done);
            });
        });
    });

    it('errs when password is wrong', (done) => {

        University.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = { method: 'GET', url: '/private', headers: { authorization: internals.header('jose', 'qwerty') } };
            server.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(401);

                server.stop(done);
            });
        });
    });

    it('errs when user is wrong', (done) => {

        University.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = { method: 'GET', url: '/private', headers: { authorization: internals.header('qwertyuiop123456', '') } };
            server.inject(request, (res) => {

                expect(res.statusCode, 'Status Code').to.equal(401);

                server.stop(done);
            });
        });
    });
});

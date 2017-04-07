'use strict';

const Code = require('code');
const Lab = require('lab');
const Package = require('../package.json');
const University = require('../lib');

const internals = {};

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('version', () => {

    it('returns version json', (done) => {

        University.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject('/version', (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal({ version: Package.version });

                server.stop(done);
            });
        });
    });
});

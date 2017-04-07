'use strict';

const Fs = require('fs');
const config = module.exports = {};


//  tls Trasport Layer Security (tls)
config.tls = {
    key: Fs.readFileSync('./lib/certs/privatekey.key'),     // Path to key
    cert: Fs.readFileSync('./lib/certs/certificate.crt'),      // Path to Certificate

    // This is necessary only if using the client certificate authentication.
    requestCert: true,

    // This is necessary only if the client uses the self-signed certificate.
    ca: []
};

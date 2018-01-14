'use strict';
const netClient = require('net').connect({port: 7001});
const ldjClient = require('./lib/ldj-client.js').connect(netClient);

ldjClient.on('message', message => {

    if(message.type === 'watching') {
        console.log(`Now watching file: ${message.file}`);
    } else if(message.type === 'changed') {
        const date = new Date(message.timestamp);
        console.log(`File changed: ${date}`);
    } else {
        throw Error(`Message type unknown: ${message.type}`);
    }
});
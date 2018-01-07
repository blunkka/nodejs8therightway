'use strict';
const net = require('net');
const client = net.connect({port: 7001});

//client object is a Socket
client.on('data', data => {
    const message = JSON.parse(data);
    //console.log(message);

    if(message.type === 'watching') {
        console.log(`Now watching file: ${message.file}`);
    } else if(message.type === 'changed') {
        const date = new Date(message.timestamp);
        console.log(`File changed: ${date}`);
    } else {
        console.log(`Message type unknown: ${message.type}`);
    }
});

//Consider what happens when the connection ends or if it fails to connect in the first place.
//This program listens for only data events, not end events or error events.
//Message boundaries...In the best case, a message will arrive all at once. But sometimes messages will arrive in pieces, split into distinct data events.
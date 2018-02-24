'use strict';

const fs = require('fs');
const zmq = require('zeromq');

//Socket to reply to client requests
const responder = zmq.socket('rep');

//Handle incoming messages
responder.on('message', data => {
    const request = JSON.parse(data);
    
    console.log(`Got request to handle: ${request.path}`);

    fs.readFile(request.path, (err, content) => {
        if(err) {
            throw err;
        }
        console.log('Sending response content.');
        responder.send(JSON.stringify({
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.pid
        }));
    });
});

responder.bind('tcp://127.0.0.1:7001', err => {
    console.log('Listing for zmq requesters...');
});

process.on('SIGINT', () => {
    console.log('Shutting down...');
    responder.close();
});

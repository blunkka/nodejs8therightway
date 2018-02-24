'use strict';

const zmq = require('zeromq');
const requester = zmq.socket('req');
const filename = process.argv[2];

//Handle response from responder
requester.on('message', data => {
    const response = JSON.parse(data);
    console.log(`Got response: `, response);
});

requester.connect('tcp://localhost:7001');

//loop to demo that requests are queued
for(let i = 1; i <= 5; i++) {
    //Send request for content
    console.log(`Sending request ${i} for: ${filename}`);
    requester.send(JSON.stringify({
        path: filename
    }));
}
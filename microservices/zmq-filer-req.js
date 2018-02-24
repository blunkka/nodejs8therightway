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

//Send request for content
console.log(`Sending request for: ${filename}`);
requester.send(JSON.stringify({
    path: filename
}));

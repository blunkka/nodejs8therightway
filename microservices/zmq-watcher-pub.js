'use strict';

const fs = require('fs');
const filename = process.argv[2];
const zmq = require('zeromq');

//Publiser endpoint
const publisher = zmq.socket('pub');

fs.watch(filename, () => {
    
    //send message to all subscribers
    publisher.send(JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: Date.now()
    }));
});

//listen tcp port 7001
publisher.bind('tcp://*:7001', err => {
    if(err) {
        throw err;
    }
    console.log('Listing for zmq subscribers...');
});
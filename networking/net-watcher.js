'use strict';
const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if(!filename) {
    throw Error('Error: No filename given!');
}

net.createServer(connection => {
    console.log('Subscriber connected.');

    //connection is a Socket object that you can use to send or receive data
    connection.write(`Now watching ${filename} for changes...\n`);

    const watcher = fs.watch(filename, () => connection.write(`File changed: ${new Date()}\n`));

    connection.on('close', () => {
        console.log('Subscriber disconnected.');
        watcher.close();
    });

}).listen('7001', () => console.log('Listening for subscribers on 7001...'));
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

//Unix sockets can be faster than TCP sockets because they don’t require invoking network hardware. However, by nature they’re confined to the machine.
}).listen('/tmp/watcher.sock', () => console.log('Listening for subscribers on /tmp/watcher.sock...'));
'use strict';
const net = require('net');
const fs = require('fs');
const filename = process.argv[2];

if(!filename) {
    throw Error('Error: Filename not given!');
}

net.createServer(connection => {
    console.log('Client connected');
    connection.write(JSON.stringify({type: 'watching', file: filename}) + '\n');

    const watcher = fs.watch(filename, () => connection.write(JSON.stringify({type:'changed', timestamp: Date.now()}) + '\n'));

    connection.on('close', () => {
        console.log('Client closed connection.');
        watcher.close();
    });

}).listen("7001", () => console.log('JSON watcher listing on 7001...'));
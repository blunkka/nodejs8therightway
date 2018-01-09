'use strict';

const server = require('net').createServer(connection => {

    const chunk1 = '{"type":"changed","timesta';
    const chunk2 = 'mp":1450694370094}\n';

    connection.write(chunk1);

    const timer = setTimeout(()=> {
        connection.write(chunk2);
        connection.end();
    }, 100);

    connection.on('end', ()=>{
        clearTimeout(timer);
        console.log('Subscriber disconnected');
    });
});

server.listen(7001, ()=>console.log('Test server listening for connections...'));
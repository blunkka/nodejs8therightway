'use strict';
const fs = require('fs');

//Asynchronously reads the entire contents of a file
fs.readFile('target.txt', (err, data) => {
    if(err) {
        throw err;
    }
    console.log(data.toString());
});
'use strict';
const fs = require('fs');

fs.writeFile('target.txt', 'I am writing...', (err) => {
    if(err) {
        throw err;
    }
    console.log('File saved!');
});
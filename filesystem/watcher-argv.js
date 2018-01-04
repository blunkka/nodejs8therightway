'use strict';
const fs = require('fs');
const filename = process.argv[2];

if(!filename){
    throw Error('Target file missing!');
}

fs.watch(filename, () => console.log(`File ${filename} changed!`));
console.log(`Waiting for ${filename} to change...`);
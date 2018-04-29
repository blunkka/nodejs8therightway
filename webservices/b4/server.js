'use strict';
const express = require('express');
const morgan = require('morgan');
const nconf = require('nconf');
const pkg = require('./package.json');

//load argument variables first ´, then environment variables.
//two underscores should be used to denote object hierarchy when reading
//from environment variables. Page 154.
nconf.argv().env('__');

//default value for conf parameter. Path to configuartion file, this can be overriden from command-line
nconf.defaults({conf: `${__dirname}/config.json`});

//load the configuration file
nconf.file(nconf.get('conf'));

const app = express();

app.use(morgan('dev'));

app.get('/api/version', (req, res) => res.status(200).send(pkg.version));

require('./lib/search.js')(app,nconf.get('es'));

app.listen(nconf.get('port'), () => console.log('B4 ready!'));
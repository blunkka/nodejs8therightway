'use strict';
const express = require('express');

//morgan provides HTTP request logging
const morgan = require('morgan');

const app = express();

//pass middleware to the application context by calling app.use
app.use(morgan('dev'));

app.get('/hello/:name', (req, res) => {
    res.status(200).json({'hello': req.params.name});
});
app.listen(60701, () => console.log('Server ready for action...'));
'use strict';
require('dotenv').config({ silent: true });
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');

const app          = express();
const PORT         = process.argv[2] || process.env.port || 3000;

const multer = require('multer');

app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(multer().none())

app.use('/api/v1', require('./routes/api.js'));

app.get('*', (req, res) => {
  res.sendFile('/index.html');
});

app.listen(PORT, () => console.warn(`Server here! Listening on port ${PORT}!`));

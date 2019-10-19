const express = require('express');

const fetch = require('node-fetch');
const app = express();
var mongoose = require('mongoose');

require('dotenv').config();





app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

const userRoutes = require('./routes/users');
const indexRoutes = require('./routes/index');

app.use('/users', userRoutes);
//app.use(indexRoutes);


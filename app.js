const path = require('path');
const express = require('express');
const session = require('express-session');
const fetch = require('node-fetch');
const app = express();
var mongoose = require('mongoose');

require('dotenv').config();

app.set('view engine','ejs');
app.set('views','public');

const DB_CONNECTOR = process.env.DB_CONNECTOR;
const SESSION_SECRET = process.env.SESSION_SECRET;
mongoose.connect(DB_CONNECTOR, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log("connected!");
  });
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.json({limit : '1mb'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret : SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

const userRoutes = require('./routes/users');
const indexRoutes = require('./routes/index');

app.use('/users', userRoutes);
app.use(indexRoutes);
//app.use(indexRoutes);


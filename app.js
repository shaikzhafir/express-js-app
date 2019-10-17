const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const app = express();

var unirest = require("unirest");
require('dotenv').config();



app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (req,res) => {
    console.log("made it here");
    database.find({},(err,data) =>{
       if (err) {
           res.end();
           return
       }
        res.json(data);
        
    });
});
//use of post, with two params, request and response
app.post('/api',(req,res) => {
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp
    database.insert(data);
    res.json({
        status : 'success',
        timestamp : timestamp,
    })
});

app.get('/qrcode/:url', async (request,response) => {
const API_KEY = process.env.API_KEY;
console.log(process.env.API_KEY);
const random_url = request.params.url;
console.log(random_url);

var req = unirest("GET", "https://pierre2106j-qrcode.p.rapidapi.com/api");

req.query({
	"backcolor": "ffffff",
	"pixel": "1 to 10",
	"ecl": "L | M| Q | H",
	"forecolor": "000000",
	"type": "text | url | tel | sms | email",
	"text": random_url
});

req.headers({
	"x-rapidapi-host": "pierre2106j-qrcode.p.rapidapi.com",
	"x-rapidapi-key": API_KEY
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);
    //console.log(res.body);
    response.json({
        url : res.body
    })
    
})



})
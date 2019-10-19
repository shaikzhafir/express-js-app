const express = require('express');
var unirest = require("unirest");
const router = express.Router();
const mongoose = require('mongoose');

let orgModel = require('../lib/Details.js');

require('dotenv').config();


router.get('/', (req,res) => {
    
    if (!req.session.user){
        return res.status(401).send();
    }
    else {
    res.render('index');
    }
})

router.get('/hello' ,(req,res) => {
    if (!req.session.user){
        return res.status(401).send();
    }
    else {
        res.render('hello');
    }
})

//reading from database
router.get('/api', (req,res) => {
    
    orgModel.find({}, function(err, foundData) {
        if (err){
            console.log(err);
            res.status(500).send();
        }
        else {
            res.send(foundData);
        }
    })


    //local database code
    /* database.find({},(err,data) =>{
       if (err) {
           res.end();
           return
       }
        res.json(data);
        
    }); */
});
//use of post, with two params, request and response
router.post('/api',(req,res) => {
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp
    console.log(data.name);
    // initialise a db, put in the data manually by connecting to req.body
    var newModel = new orgModel();
    newModel.name = data.name;
    newModel.qrcode = data.qrcode;
    newModel.date = data.date;
    newModel.save(function(err, savedObject){
        if (err){
            console.log(err);
            res.status(500).send();
        }
        else {
            res.send(savedObject);
        }
    });
    
    /* 
    old database using nedb
    database.insert(data);
    res.json({
        status : 'success',
        timestamp : timestamp,
    }) */
});

router.get('/qrcode/:url', async (request,response) => {
const API_KEY = process.env.API_KEY;
const random_url = request.params.url;

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


module.exports = router;
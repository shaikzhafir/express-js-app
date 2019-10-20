const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var User = require('../lib/User');
const mongoose = require('mongoose');



router.get('/', (req,res) => {
    res.render('main');
})



router.post('/login', (req,res)=> {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username : username , password : password }, (err,user) =>{
        if (err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.json()
        }
        else {
            //registers the session with user 
            req.session.user = user;
            return res.json(200);
        
        }
    });

});

router.post('/register', (req,res) => {
    var username = req.body.username;
    var password = req.body.password;

    var newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.save((err,savedUser)=>{
        if (err){
            console.log(err);
            return res.status(500).send();
        }
        else {
            console.log('yo udid it ');
        }
    })

})


module.exports = router;
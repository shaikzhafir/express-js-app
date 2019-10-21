var mongoose = require('mongoose');


var mySchema = mongoose.Schema({
    name : String,
    qrcode : String,
    imageUrl : String, 
    date : Date,
    tech : Boolean,
    sports : Boolean,
    recreation : Boolean,
    educational : Boolean
})

var orgModel = mongoose.model('choices', mySchema);


module.exports = orgModel;
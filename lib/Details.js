var mongoose = require('mongoose');


var mySchema = mongoose.Schema({
    name : String,
    qrcode : String,
    imageUrl : String, 
    date : Date,
    type : String
})

var orgModel = mongoose.model('choices', mySchema);


module.exports = orgModel;
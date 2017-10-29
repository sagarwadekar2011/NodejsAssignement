const mongoose = require('mongoose');

var User = mongoose.model('User', new mongoose.Schema( {

    fName : String,

    lName : String,

    email : String,

    pinCode : Number,
    
    birthDate : Date,

    isActive : Boolean  
} 
));

module.exports = {User};

const mongoose = require('mongoose');

var Todos = mongoose.model('Todos', new mongoose.Schema( {

    userid : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    text : String,

    done : Boolean,

    pinCode : Number,
    
    targetDate : Date

} 
));

module.exports = {Todos};

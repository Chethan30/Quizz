const mongoose = require('mongoose');
var round2Schema = new mongoose.Schema({
    QNO:{
        type:Number
    },
    Question:{
        type:String
    },
    TrueorFalse:{
        type:String
    },
    Comments:{
        type:String
    }
});

const Round2model= mongoose.model('Round2', round2Schema);
module.exports = Round2model;
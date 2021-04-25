const mongoose = require('mongoose');
var round3Schema = new mongoose.Schema({
    QNO:{
        type:Number
    },
    Option1:{
        type:String
    },
    Option2:{
        type:String
    },
    Option3:{
        type:String
    },
    Option4:{
        type:String
    },
    Answer:{
        type:String
    },
    KanAnswer:{
        type:String
    },
    Images:{
        type:String
    }
});

const Round3model= mongoose.model('Round3', round3Schema);
module.exports = Round3model;
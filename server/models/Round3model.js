const mongoose = require('mongoose');
var round3Schema = new mongoose.Schema({
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
const mongoose = require('mongoose');

var round1Schema = new mongoose.Schema({
    Topic:{
        type:String
    },
    Question:{
        type:String
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
    
});

const Round1model= mongoose.model('Round1', round1Schema);
module.exports = Round1model;
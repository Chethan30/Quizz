exports.first = async function (db, data) {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.collection("Round1").deleteMany({});
    db.collection("Round1").insertMany(data);
    return 1;
}

exports.second = function (db) {

    return new Promise(function (resolve, reject) {
        console.log("Shruthii");
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("Round1").find({}).toArray(function(err,data){
            if(!err){
                resolve(data);
            }
            else{
                console.log("error");
                reject("not res");
            }
        });
       
        
    });
}
exports.Round2insert =async function(db,data){
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.collection("Round2").deleteMany({});
    db.collection("Round2").insertMany(data);
    return 1;
}

exports.Round3insert = async function(db,data){
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.collection("Round3").deleteMany({});
    db.collection("Round3").insertMany(data);
    return 1;
}
    

exports.getRound2Questions = function (db) {

    return new Promise(function (resolve, reject) {
        console.log("Shruthii");
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("Round2").find({}).toArray(function(err,data){
            if(!err){
                resolve(data);
            }
            else{
                console.log("error");
                reject("not res");
            }
        });
       
        
    });
}


exports.getRound3Questions = function (db) {

    return new Promise(function (resolve, reject) {
        console.log("Shruthii");
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("Round3").find({}).toArray(function(err,data){
            if(!err){
                resolve(data);
            }
            else{
                console.log("error");
                reject("not res");
            }
        });
       
        
    });
}
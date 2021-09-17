exports.first = async function (db, data) {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.collection("round1").deleteMany({});
    console.log(data)
    db.collection("round1").insertMany(data);
    return 1;
}

exports.second = function (db) {

    return new Promise(function (resolve, reject) {
       
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("round1").find({}).toArray(function(err,data){
            if(!err){
                resolve(data);
            }
            else{
               
                reject("not res");
            }
        });
       
        
    });
}
exports.Round2insert =async function(db,data){
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.collection("round2").deleteMany({});
    db.collection("round2").insertMany(data);
    return 1;
}

exports.Round3insert = async function(db,data){
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.collection("round3").deleteMany({});
    db.collection("round3").insertMany(data);
    return 1;
}
    

exports.getRound2Questions = function (db) {

    return new Promise(function (resolve, reject) {
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("round2").find({}).toArray(function(err,data){
            if(!err){
                resolve(data);
            }
            else{
                reject("not res");
            }
        });
       
        
    });
}


exports.getRound3Questions = function (db) {

    return new Promise(function (resolve, reject) {
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.collection("round3").find({}).toArray(function(err,data){
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
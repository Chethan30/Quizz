exports.first = function (db, data) {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.collection("Round1").deleteMany({});
    db.collection("Round1").insertMany(data);
    console.log("d");
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
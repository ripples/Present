var database = {
    data: "look at me",
    cow: "zoopal"
}

exports.getDB = function (){
    return database;
};

exports.setDB = function(data){
    database = data;
}
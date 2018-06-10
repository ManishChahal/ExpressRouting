var mongo = require('mongojs');
var database = "localhost/myFirstDatabase";
var collection = ["footballersData"];
var db = mongo(database,collection);

function insertData(request , response){
    let data =JSON.parse(request.body);
    db.footballersData.insert(data , function(error , result){
        if(error)
        {
            return "Unable to insert data due to some issues";
        }
        else{
            response.send(result);
        }
    })
}

function readData(request , response){
    db.footballersData.find({}, function(error , data){
        if(error)
        {
            return "Unable to fetch data due to some issues";
        }

        else if (data.length === 0){
            return "Invalid data returned";
        }

        else {
            response.json(data);
        }
    })
}

function updateData(request , response){
    let updatedData = request.body;
    db.footballersData.update({year : updatedData.year}, {$set : {goalsScored : updatedData.goalsScored}}, {multi : true},function(error , result){
        if(error){
            response.send("Unable to update data");
        }
        else{
            let recordsUpdated = result.nModified;
            db.footballersData.find({year : updatedData.year , goalsScored : updatedData.goalsScored} , function(error , data){
                if(error){
                    return "Unable to fetch updated data";
                }
                else
                {
                    let finalResult = {recordsUpdated : recordsUpdated ,actualData : data };
                    response.send(finalResult);
                }
            });
            
        }
    })
}

function deleteData(request , response){
    let deleteObject = JSON.parse(request.body);
    db.footballersData.find({fName : deleteObject.fName , lName : deleteObject.lName}, function(error , data){
        if(error){
            response.send("No such data exists");
        }
        else{
            let dataToBeDeleted = data;
            db.footballersData.remove({fName : deleteObject.fName , lName : deleteObject.lName}, function(error , result){
                if(error)
                {
                    response.send("Unable to delete documents");
                }
                else{
                    let finalDeletedResult = {recordsDeleted : result.deletedCount , dataToBeDeleted : dataToBeDeleted};
                    response.send(finalDeletedResult);
                }
            })
        }
    })
}

module.exports = {
    insertData : insertData,
    readData : readData,
    updateData : updateData,
    deleteData : deleteData
};
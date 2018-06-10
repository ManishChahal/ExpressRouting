var mongo = require('mongojs');
var database = "localhost/myFirstDatabase";
var collection = ["footballersData"];
var db = mongo(database,collection);

function insertDataWithParameters(request , response){
    let fName = request.params.parameterOne;
    let lName = request.params.parameterTwo;
    let requestData =JSON.parse(request.body);
    let league = requestData.league;
    let goalsScored = requestData.goalsScored;
    let year = requestData.year;
    let data = {fName : fName , lName : lName , league : league , goalsScored : goalsScored , year : year};
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

function readDataWithParameters(request , response){
    let getParamOne = request.params.parameterOne;
    let getParamTwo = request.params.parameterTwo;
    db.footballersData.find({fName : getParamOne , lName : getParamTwo}, function(error , data){
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

function updateDataWithParameters(request , response){
    let updateParamOne = request.params.parameterOne;
    let updateParamTwo = +request.params.parameterTwo;
    let updateParamBody = +request.body;
    console.log(updateParamBody);
    db.footballersData.update({fName : updateParamOne , year : updateParamTwo}, {$set : {goalsScored : updateParamBody}}, {multi : true},function(error , result){
        if(error){
            response.send("Unable to update data");
        }
        else{
            let recordsUpdated = result.nModified;
            db.footballersData.find({year : updateParamTwo , fName : updateParamOne} , function(error , data){
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

function deleteDataWithParameters(request , response){
    let deleteParamOne = request.params.parameterOne;
    let deleteParamTwo = request.params.parameterTwo;
    db.footballersData.find({fName : deleteParamOne , lName : deleteParamTwo}, function(error , data){
        if(error){
            response.send("No such data exists");
        }
        else{
            let dataToBeDeleted = data;
            /*
            deleteParamTwo = dataToBeDeleted[0].fName;
            deleteParamTwo = dataToBeDeleted[0].lName;
            */
            db.footballersData.remove({fName : deleteParamOne , lName : deleteParamTwo}, function(error , result){
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
    insertDataWithParameters : insertDataWithParameters,
    readDataWithParameters : readDataWithParameters,
    updateDataWithParameters : updateDataWithParameters,
    deleteDataWithParameters : deleteDataWithParameters
};
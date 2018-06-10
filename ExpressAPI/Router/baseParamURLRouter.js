var express = require('express');
var app = express();
var database = require('../Database/databaseModuleParam');
var router = express.Router();

router.route('/:parameterOne/:parameterTwo').
get(function(request , response){
    database.readDataWithParameters(request,response)
}).
post(function(request , response){
    database.insertDataWithParameters(request , response)
}).
put(function(request,response){
    database.updateDataWithParameters(request , response)
}).
delete(function(request,response){
    database.deleteDataWithParameters(request , response);
});
//Exporting the router to make it available in other modules
module.exports = router;
var express = require('express');
var app = express();
var database = require('../Database/databasemodule');
var router = express.Router();

router.route('/').
get(function(request , response){
    database.readData(request,response)
}).
post(function(request , response){
    database.insertData(request , response)
}).
put(function(request,response){
    database.updateData(request , response)
}).
delete(function(request,response){
    database.deleteData(request , response);
});
//Exporting the router to make it available in other modules
module.exports = router;
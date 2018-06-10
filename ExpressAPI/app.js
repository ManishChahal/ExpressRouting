var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var baseURLRouter = require('./Router/baseURLRouter');
var baseURLParamRouter = require('./Router/baseParamURLRouter');

app.use(cors());
app.use(bodyParser.text());
app.use(bodyParser.json({type : "application/json"}));
app.use(bodyParser.urlencoded({extended  : true}));
//Here router is mounted whnever there will be a reuest to / URL than it will be using our baseURLRouter defined in baseURLRouter.js
app.use('/params',baseURLParamRouter);
app.use('/',baseURLRouter);
/*
var cors = require('cors');
var bodyParser = require('body-parser');
var database = require('./Database/databasemodule');

app.use(cors());
app.use(bodyParser.text());
app.use(bodyParser.json({type : "application/json"}));
*/


/*We can define a route path instance and then chain all the requests on the instance. When we have a request to "/" URL than the method 
will be called based on the type of the request. If we want we can call methods individually on the route instance instead of 
chaining them together. Please define the route instance after call to cors middleware else it will complain about cross origin headers. Here 
code readability is more as one can just say by looking at the code which method will be called for a request to a particular URL depending
on the type of request*/
/*
var baseURL = app.route("/");
baseURL.
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
*/


/*
//We can respond to API calls like this but later on our code will become messy and readability will decrease
app.get("/",function(request , response){
    database.readData(request,response);
});

app.post("/",function(request , response){
    database.insertData(request , response);
});

app.put("/",function(request,response){
    database.updateData(request , response);
});

app.delete("/",function(request,response){
    database.deleteData(request , response);
})*/
app.listen(5051);
var app = require('../app.js').app;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var User = require('../models/user.js').User;
var Todos = require('../models/todos.js').Todos;


//REST Api to add new todo
app.post('/addTodo', (req, res)=>{
    var newTodo =  req.body;
    newTodo.targetDate = new Date(newTodo.targetDate);
    var todo = new Todos(newTodo);
    todo.save().then( ()=>{
        var result = {
                status : 'Created new todo',
                code : 201
            }
        res.send(result);
        return;
    }).catch( (err)=>{
        var result = {
                status : 'Unable to Save the todo',
                code : 500
            }
        res.send(result);
        return;
    });
});


//Get Specific todo Item 
app.get('/getTodo/:todoid', (req, res)=>{
    Todos.findById(req.params.todoid, (err, data)=>{
        if(err){
            var result = {
                status : 'Internal Server Error',
                code : 500
            };
        res.send(result);
        return;
        }else{
            var result = {
                status : 'Success',
                code : 200,
                data : data
            };
        res.send(result);
        return;
        }
    })
});

// REST API to get the todos target date is in today or Tomorrow
app.get('/getTargetedforTodayAndTomorrow/:userid', (req, res)=>{
 var currentTimestamp = new Date().getTime();
 var AfterTwoDaysTimeStamp = currentTimestamp  + (48 * 60 * 60 * 1000) ;
 Todos.aggregate([
     {
      $match : { 
                 targetDate : { $gt: currentTimestamp, $lt: AfterTwoDaysTimeStamp },
                 done : false
              }
    }
 ], (err, data)=>{
     if(err){
         var result = {
                status : 'Unable to Save the todo',
                code : 500
            }
          res.send(result);
          return;
     }else{
            var result = {
                status : 'Success',
                code : 200,
                data : data
            }
          res.send(result);
          return;     
        }
 });
});
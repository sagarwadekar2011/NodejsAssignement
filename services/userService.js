var app = require('../app.js').app;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var User = require('../models/user.js').User;
var Todos = require('../models/todos.js').Todos;


app.post('/addUser', (req, res)=>{
    var newUser = req.body;
    newUser.birthDate = new Date(newUser.birthDate);
    var user = new User(newUser);
    user.save().then(()=>{   
    var result = {
                status : 'Created User',
                code : 201
            }
    res.send(result);
    return;
    }).catch((err)=>{
    var result = {
                status : 'Internal Server Error',
                code : 500
            }
    res.send(result);
    return;
    });
});

//Rest API to get the User by User id
app.get('/getUserDetails/:userid', (req, res)=>{
    var userid = req.params.userid;
    var ResultData = {};
     User.findById(userid, (err, data)=>{
        if(err){
            var result = {
                status : 'Internal Server Error',
                code : 500
            };
            res.send(result);
        }else {
           if(data.length != 0){
               Todos.find({userid : userid,  done: false }, (err, data1)=>{
                        if(err){
                            var result = {
                            status : 'Internal Server Error',
                            code : 500
                        };
                          res.send(result);
                          return;
                        }else{
                             ResultData.user = data;
                            ResultData.activeTodo = data1;
                        }
                        var result = {
                                status : 'Success',
                                code : 200,
                                data : ResultData
                             };
                          res.send(result);
                          return;
               });             
           }
        }
     });
});


// Get All active Users and Related todo Items
app.get('/getUsersAndTodos', (req, res)=>{
 var resultData = [];
 User.find({isActive : true} , (err, data)=>{
    if(err){
           var result = {
                status : 'Internal Server Error',
                code : 500
            };
            res.send(result);
    }else{
      if(data.length != 0){
      data.forEach(function(element, index) {
            Todos.find({userid : element._id}).then( (todos)=>{
                        newresultDataItem = {
                            user : element,
                            todos : todos
                        };
                        resultData.push(newresultDataItem);
                        if( index === (data.length - 1)){
                             var result = {
                            status : 'Success',
                            code : 200,
                            data : resultData };
                            res.send(result);
                            return;
                        }
            });                 
      }, this);
    
      }else{
                   var result = {
                            status : 'Success',
                            code : 200,
                            data : resultData
                        };
                        res.send(result);
                        return;
    }
    }
   });
});

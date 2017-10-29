const express = require('express');
require('./dbconfig.js');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
module.exports = {app};

var User = require('./models/user.js');
var Todos = require('./models/todos.js');


var userService = require('./services/userService.js');
var todosService = require('./services/todoService.js');

app.listen(3000, ()=>{
    console.log(' ** Listening  to the port 3000**');
});





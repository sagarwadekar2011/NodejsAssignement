// const mongoClient = require('mongodb').MongoClient;

// mongoClient.connect('mongodb://localhost/assignment').then(()=>{
//     console.log('Connencted Success');
// },
// ()=>{
//     console.log('Failed to connect');
// }
// );


var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/assignment';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

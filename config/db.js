var mongoose = require('mongoose');
var db = mongoose.connection;
//mongoose.connect('mongodb://root:root@ds041663.mongolab.com:41663/everquizdb');
mongoose.connect('mongodb://localhost/everquizdb');

db.on('connected', function() {
    console.log('Mongoose connected to everquizdb');
});

db.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

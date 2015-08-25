var mongoose = require('./lib/mongoose');
var User = require('./models/user').User;
var Quiz = require('./models/quiz').Quiz;

var testUser1 = new User({ name: "testUser1",
                          mail: "mail@mail.com",
                          password: "password",
                          status: "Quo",
                          notes: [],
                          history: [],
                          statistics: [],
                          follows: []
                          });

mongoose.connection.on('open', function() {
  testUser1.save(function (err, testUser1, affected) {
    console.log(arguments)
  });
});
                      
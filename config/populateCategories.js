var mongoose = require('mongoose'),
    Category = mongoose.model('Category');

var categories = [
  {
    'title': 'HTML'
  },
  {
    'title': 'CSS'
  }
];

for (var i = categories.length - 1; i >= 0; i--) {
  var category = new Category();
  category.title = categories[i].title;
  Category.findOne(categories[i]).exec()
    .then(function(res) {
      if (res == null) {
        category.save();
      };
    })
};

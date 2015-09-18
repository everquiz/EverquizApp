angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("admin/index.html","<p>{{test}}</p>\r\n<div class=\"demoBtn raised green\">\r\n  <a ui-sref=\".users\"><div class=\"center\" fit>Users</div></a>\r\n</div> \r\n<div class=\"demoBtn raised green\">\r\n  <a ui-sref=\".quizzes\"><div class=\"center\" fit>Quizzes</div></a>\r\n</div>   \r\n<div class=\"demoBtn raised green\">\r\n  <a ui-sref=\".categories\"><div class=\"center\" fit>Categories</div></a>\r\n</div>   \r\n<ui-view></ui-view>");
$templateCache.put("auth/login.html","<div class=\"page-header\">\r\n  <h1>Login template</h1>\r\n</div>\r\n\r\n<div ng-show=\"AuthCtrl.error\" class=\"alert alert-danger row\">\r\n  <span>{{ AuthCtrl.error.message }}</span>\r\n</div>\r\n\r\n<form ng-submit=\"AuthCtrl.logIn()\"\r\n  style=\"margin-top:30px;\">\r\n  <h3>Log In</h3>\r\n\r\n  <div class=\"form-group\">\r\n    <input type=\"text\"\r\n    class=\"form-control\"\r\n    placeholder=\"email\"\r\n    ng-model=\"AuthCtrl.user.email\"></input>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <input type=\"password\"\r\n    class=\"form-control\"\r\n    placeholder=\"Password\"\r\n    ng-model=\"AuthCtrl.user.password\"></input>\r\n  </div>\r\n  <button type=\"submit\" class=\"btn btn-primary\">Log In</button>\r\n</form>");
$templateCache.put("auth/register.html","<div class=\"page-header\">\r\n  <h1>Registration template</h1>\r\n</div>\r\n\r\n<div ng-show=\"AuthCtrl.error\" class=\"alert alert-danger row\">\r\n  <span>{{ AuthCtrl.error.message }}</span>\r\n</div>\r\n\r\n<form ng-submit=\"AuthCtrl.register()\"\r\n  style=\"margin-top:30px;\">\r\n  <h3>Register</h3>\r\n\r\n  <div class=\"form-group\">\r\n    <input type=\"text\"\r\n    class=\"form-control\"\r\n    placeholder=\"email\"\r\n    ng-model=\"AuthCtrl.user.email\"></input>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <input type=\"password\"\r\n    class=\"form-control\"\r\n    placeholder=\"Password\"\r\n    ng-model=\"AuthCtrl.user.password\"></input>\r\n  </div>\r\n  <button type=\"submit\" class=\"btn btn-primary\">Register</button>\r\n</form>");
$templateCache.put("home/index.html","<div ui-view=\"header\"></div>\r\n<div ui-view=\"getStarted\"></div>\r\n<div ui-view=\"profile\" id=\"profile\"></div>\r\n<div ui-view=\"quizzes\"></div>\r\n<div ui-view=\"notes\"></div>\r\n<div ui-view=\"getFail\"></div>\r\n<div ui-view=\"footer\"></div>");
$templateCache.put("home/_getFail.html","get fail\r\n<hr>");
$templateCache.put("home/_getStarted.html","get started\r\n<hr>");
$templateCache.put("layouts/_footer.html","<a>&lt;EPAM&gt;</a>\r\n<footer>\r\n  <ul>\r\n    <li>t</li>\r\n    <li>f</li>\r\n    <li>in</li>\r\n    <li>g+</li>\r\n  </ul>\r\n</footer>\r\n<span>Developed by EPAM lab</span>");
$templateCache.put("layouts/_header.html","<ul>\r\n  <li><a ng-click=\"NavCtrl.goHome()\">HOME</a></li>\r\n  <li>VIDEO</li>\r\n  <li>QUIZZES</li>\r\n  <li ng-show=\"NavCtrl.isLoggedIn()\">NOTES</li>\r\n  <li>GET FAIL?</li>\r\n\r\n  <li ng-show=\"NavCtrl.isLoggedIn()\"><a ng-click=\"NavCtrl.showProfile()\">{{ NavCtrl.currentUser() }}</a></li>\r\n  <li ng-show=\"NavCtrl.isLoggedIn()\"><a href=\"\" ng-click=\"NavCtrl.logOut()\">Log Out</a></li>\r\n  <li ng-hide=\"NavCtrl.isLoggedIn()\"><a href=\"#/login\">Log In</a></li>\r\n  <li ng-hide=\"NavCtrl.isLoggedIn()\"><a href=\"#/register\">Register</a></li>\r\n</ul>\r\n<hr>");
$templateCache.put("notes/_notes.html","<div ng-show=\"true\">\r\n  <hr>\r\n  <ul>\r\n  <li ng-repeat=\"note in NotesCtrl.notes\">\r\n    <hr>\r\n    <div class=title\">{{note.title}}</div>\r\n    <div class=title\">{{note.text}}</div>\r\n    <hr>\r\n  </li>\r\n  </ul>\r\n  <form ng-submit=\"NotesCtrl.addNote(NotesCtrl.newNote)\">\r\n    <div><h2>Create note</h2></div>\r\n    <div>Add title</div>\r\n    <textarea ng-model=\"NotesCtrl.newNote.title\" placeholder=\"Title\"></textarea><br/>\r\n\r\n    <div>Add text</div>\r\n    <textarea ng-model=\"NotesCtrl.newNote.text\" placeholder=\"Text\"></textarea><br/>\r\n\r\n    <div>\r\n      <input type=\"submit\" value=\"Submit\" />\r\n    </div>\r\n  </form>\r\n  <hr>\r\n</div>\r\n");
$templateCache.put("profile/_profile.html","<!--<span ng-show=\"!profileCtrl.profile()\">video</span>-->\r\n<!--<span ng-show=\"profileCtrl.profile()\">profile</span>-->\r\n<!--<hr>-->\r\n<div ng-show=\"!ProfileCtrl.isVisible()\">video</div>\r\n<div class=\"l-wrapper\" ng-show=\"ProfileCtrl.isVisible()\">\r\n<div class=\"profile\">\r\n    <div class=\"profile-photo\">\r\n        <div class=\"profile-photo__image-outer\">\r\n            <img src=\"\" alt=\"Image\">\r\n        </div>\r\n    </div>\r\n    <div class=\"profile-content\">\r\n        <h1 class=\"profile-content__name\">{{ProfileCtrl.profile.name}}</h1>\r\n        <div class=\"profile-content-item\">\r\n            <span class=\"profile-content-item__header\">Total Passing:</span>\r\n            <span class=\"profile-content-item__value\">{{ProfileCtrl.profile.quizCompleted}}</span>\r\n        </div>\r\n        <div class=\"profile-content-item\">\r\n            <span class=\"profile-content-item__header\">Average result:</span>\r\n            <span class=\"profile-content-item__value\">{{ProfileCtrl.profile.averageResult}}</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n</div>\r\n<hr>");
$templateCache.put("quizzes/_addQuiz.html","<div class=\"quiz\">\r\n  <div class=\"quiz-header\">\r\n    <p class=\"quiz-header__title\">Quiz title</p>\r\n    <p class=\"quiz-header__description\">Quiz description</p>\r\n  </div>\r\n  <div class=\"quiz__title\">\r\n    Quiz title\r\n  </div>\r\n  <div class=\"quiz-question-block\">\r\n      <div class=\"question-block__question\" ng-repeat=\"i in [0,1,2]\" style=\"display: inline-block; margin-left: 64px;\">\r\n        <input type=\"text\" class=\"question-block__question_add\" placeholder=\"Type question here\">\r\n      </div>\r\n  </div>\r\n\r\n    <form action=\"\" class=\"question-block-answers\" >\r\n      \r\n        <ul class=\"question-block-answers-list\" ng-repeat=\"i in [0,1,2]\"  style=\"display: inline-block; list-style: none;\">\r\n          <li class=\"question-block-answers-list-item\">\r\n              <input type=\"checkbox\" class=\"question-block-answers-list-item__correct\">\r\n              <input type=\"text\" class=\"question-block-answers-list-item\" placeholder=\"Type answer variant here\">\r\n          </li>\r\n          <li class=\"question-block-answers-list-item\">\r\n              <input type=\"checkbox\" class=\"question-block-answers-list-item__correct\">\r\n              <input type=\"text\" class=\"question-block-answers-list-item\" placeholder=\"Type answer variant here\">\r\n          </li>\r\n          <li class=\"question-block-answers-list-item\">\r\n              <input type=\"checkbox\" class=\"question-block-answers-list-item__correct\">\r\n              <input type=\"text\" class=\"question-block-answers-list-item\" placeholder=\"Type answer variant here\">\r\n          </li>\r\n          <li class=\"question-block-answers-list-item\">\r\n              <input type=\"checkbox\" class=\"question-block-answers-list-item__correct\">\r\n              <input type=\"text\" class=\"question-block-answers-list-item\" placeholder=\"Type answer variant here\">\r\n          </li>\r\n        </ul>\r\n        \r\n    </form>\r\n    \r\n  <div class=\"quiz-control\">\r\n    <button class=\"quiz-control__prev\">Previous</button>\r\n    <button class=\"quiz-control__next\">Next</button>\r\n  </div>\r\n\r\n  <div class=\"quiz-back\"><a href=\"quizzes.html\" class=\"quiz-back__link\">BACK TO ALL QUIZZES</a></div>\r\n  <div class=\"quiz-counter\">\r\n      <span class=\"quiz-counter-indicator\">\r\n        <span class=\"quiz-counter-indicator__item quiz-counter-indicator__item_current\">7</span\r\n        ><span class=\"quiz-counter-indicator__item quiz-counter-indicator__item_separator\">/</span\r\n        ><span class=\"quiz-counter-indicator__item quiz-counter-indicator__item_total\">20</span>\r\n      </span>\r\n  </div>\r\n</div>  ");
$templateCache.put("quizzes/_quizzes.html","<div ui-view=\"list\" ng-if=\"!QuizzesContainerCtrl.quizService.activeQuiz\"></div>\r\n<div ui-view=\"quiz\" ng-if=\"QuizzesContainerCtrl.quizService.activeQuiz\"></div>");
$templateCache.put("admin/categories/_categories.html","<div class=\"quizzes-header\">\r\n    <div class=\"quizzes-header__title\">Categories</div>\r\n</div>\r\n\r\n<div class=\"quizzes-selection\">\r\n    <table class=\"quizzes-selection-table\">\r\n        <tr class=\"quizzes-selection-table-row-heading\">\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Title</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Description</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Actions</th>\r\n        </tr>\r\n        <tr class=\"quizzes-selection-table-row-content\" ng-repeat=\"category in CategoriesCtrl.categories\">\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{category.title}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{category.description}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\"><i class=\"fa fa-trash-o\" ng-click=\'CategoriesCtrl.removeCategory(category)\'></i>  <i class=\"fa fa-wrench\" ng-click=\'CategoriesCtrl.editCategory(category)\'></i></td>\r\n        </tr>\r\n    </table>\r\n</div>\r\n\r\n<form ng-submit=\"CategoriesCtrl.addCategory()\" style=\"margin: 30px auto 0;\" class=\"form-container\">\r\n  <div class=\"form-title\"><h2>Add new category</h2></div>\r\n\r\n  <div class=\"form-title\">Title</div>\r\n  <input class=\"form-field\" type=\"text\" placeholder=\"Title\" ng-model=\"CategoriesCtrl.category.title\"></input><br/>\r\n\r\n  <div class=\"form-title\">Description</div>\r\n  <textarea class=\"form-field\" ng-model=\"CategoriesCtrl.category.description\" placeholder=\"Description\"></textarea><br/>\r\n\r\n  <div class=\"submit-container\">\r\n  <input class=\"submit-button\" type=\"submit\" value=\"Submit\" />\r\n  </div>\r\n</form>");
$templateCache.put("admin/question/_question.html","<div class=\"quizzes-header\">\r\n    <div class=\"quizzes-header__title\">{{QuestionCtrl.question.text}}</div>\r\n</div>\r\n<div class=\"quizzes-header\">\r\n    <div class=\"quizzes-header__title\">Answers</div>\r\n</div>\r\n\r\n<div class=\"quizzes-selection\">\r\n    <table class=\"quizzes-selection-table\">\r\n        <tr class=\"quizzes-selection-table-row-heading\">\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Text</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">ID</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">createAt</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Correct</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Actions</th>\r\n        </tr>\r\n        <tr class=\"quizzes-selection-table-row-content\" ng-repeat=\"answer in QuestionCtrl.question.answers\">\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{answer.text}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{answer._id}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{answer.createAt}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{answer.correct}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\"><i class=\"fa fa-trash-o\" ng-click=\'QuestionCtrl.removeAnswer(answer)\'></i><i class=\"fa fa-wrench\" ng-click=\'QuestionCtrl.editAnswer(answer)\'></i></td>\r\n        </tr>\r\n    </table>\r\n</div>\r\n\r\n\r\n<!-- <h2>\r\n  {{questionCtrl.question.text}}\r\n</h2>\r\n<h3>\r\n  Answers:\r\n</h3>\r\n<div ng-repeat=\"answer in questionCtrl.question.answers\">\r\n  <i class=\"fa fa-trash-o\" ng-click=\'questionCtrl.removeAnswer(answer)\'></i>\r\n  <i class=\"fa fa-wrench\" ng-click=\'questionCtrl.editAnswer(answer)\'></i>\r\n  <a href=\"#/question/{{question._id}}/question/{{question._id}}\">\r\n    {{answer.text}}\r\n  </a>\r\n  - {{answer.correct}}\r\n  <small>createAt</small> {{question.createAt}}\r\n\r\n</div> -->\r\n\r\n<!-- post template -->\r\n\r\n<!-- <form ng-submit=\"questionCtrl.addAnswer()\"\r\n  style=\"margin-top:30px;\">\r\n  <h3>Add new/edit answer</h3>\r\n\r\n  <input type=\"text\" placeholder=\"Text of question\" ng-model=\"answer.text\"></input><br/>\r\n\r\n  <label for=\"correct\">is this a correct answer?</label>\r\n  <input name=\"correct\" type=\"checkbox\"\r\n  ng-model=\"answer.correct\"></input><br/>\r\n\r\n  <button type=\"submit\">go</button>\r\n</form> -->\r\n\r\n<form ng-submit=\"QuestionCtrl.addAnswer()\" style=\"margin: 30px auto 0;\" class=\"form-container\">\r\n  <div class=\"form-title\"><h2>Add new/edit answer</h2></div>\r\n\r\n  <div class=\"form-title\">Text</div>\r\n  <textarea class=\"form-field\" ng-model=\"QuestionCtrl.answer.text\" placeholder=\"Text\"></textarea><br/>\r\n\r\n  <div class=\"form-title\">Is correct?</div>\r\n  <input name=\"correct\" type=\"checkbox\"\r\n  ng-model=\"QuestionCtrl.answer.correct\"></input><br/>\r\n\r\n  <div class=\"submit-container\">\r\n  <input class=\"submit-button\" type=\"submit\" value=\"Submit\" />\r\n  </div>\r\n</form>\r\n");
$templateCache.put("admin/quiz/_quiz.html","<div class=\"quizzes-header\">\r\n    <div class=\"quizzes-header__title\">{{QuizCtrl.quiz.title}}</div>\r\n</div>\r\n<div class=\"quizzes-header\">\r\n    <div class=\"quizzes-header__title\">Questions</div>\r\n</div>\r\n\r\n<div class=\"quizzes-selection\">\r\n    <table class=\"quizzes-selection-table\">\r\n        <tr class=\"quizzes-selection-table-row-heading\">\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Text</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">ID</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">createAt</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Total Answers</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Actions</th>\r\n        </tr>\r\n        <tr class=\"quizzes-selection-table-row-content\" ng-repeat=\"question in QuizCtrl.quiz.questions\">\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{question.text}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\"  ui-sref=\"admin.question({ id: question._id})\">{{question._id}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{question.createAt}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{question.answers.length}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\"><i class=\"fa fa-trash-o\"  ng-click=\'QuizCtrl.removeQuestion(question)\'></i><i class=\"fa fa-wrench\" ng-click=\'QuizCtrl.editQuestion(question)\'></i></td>\r\n        </tr>\r\n    </table>\r\n</div>\r\n\r\n<!-- post template -->\r\n<!-- <form ng-submit=\"quizCtrl.addQuestion()\"\r\n  style=\"margin-top:30px;\">\r\n  <h3>Add new question</h3>\r\n\r\n  <input type=\"text\" placeholder=\"Text of question\" ng-model=\"question.text\"></input><br/>\r\n  \r\n  <button type=\"submit\">New question</button>\r\n</form> -->\r\n<form ng-submit=\"QuizCtrl.addQuestion()\" style=\"margin: 30px auto 0;\" class=\"form-container\">\r\n  <div class=\"form-title\"><h2>Add new question</h2></div>\r\n\r\n  <div class=\"form-title\">Text</div>\r\n  <textarea class=\"form-field\" ng-model=\"QuizCtrl.question.text\" placeholder=\"Text\"></textarea><br/>\r\n\r\n  <div class=\"submit-container\">\r\n  <input class=\"submit-button\" type=\"submit\" value=\"Submit\" />\r\n  </div>\r\n</form>\r\n");
$templateCache.put("admin/quizzes/_quizzes.html","<div class=\"quizzes-header\">\r\n    <div class=\"quizzes-header__title\">Quizzes</div>\r\n</div>\r\n\r\n<div class=\"quizzes-selection\">\r\n    <table class=\"quizzes-selection-table\">\r\n        <tr class=\"quizzes-selection-table-row-heading\">\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Category</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Name</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Description</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">createAt</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Status</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Total questions</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Actions</th>\r\n        </tr>\r\n        <tr class=\"quizzes-selection-table-row-content\" ng-repeat=\"quiz in QuizzesCtrl.quizzes\">\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.category.title}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\"  ui-sref=\"admin.quiz({ id: quiz._id})\">{{quiz.title}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.description}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.createAt}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{QuizzesCtrl.getStatus(quiz.status)}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.questions.length}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\"><i class=\"fa fa-trash-o\" ng-click=\'QuizzesCtrl.deactivateQuiz(quiz)\'></i>  <i class=\"fa fa-play\" ng-click=\'QuizzesCtrl.activateQuiz(quiz)\'></i>  <i class=\"fa fa-wrench\" ng-click=\'quizzesCtrl.editQuiz(quiz)\'></i></td>\r\n        </tr>\r\n    </table>\r\n</div>\r\n\r\n<form ng-submit=\"QuizzesCtrl.addQuiz()\" style=\"margin: 30px auto 0;\" class=\"form-container\">\r\n  <div class=\"form-title\"><h2>Add new quiz</h2></div>\r\n\r\n  <div class=\"form-title\">Category:</div>\r\n  <select class=\"form-field\" name=\"category\" ng-model=\"QuizzesCtrl.quiz.category\"ng-options=\"o._id as o.title for o in QuizzesCtrl.categories\"></select>\r\n\r\n  <div class=\"form-title\">Title</div>\r\n  <input class=\"form-field\" type=\"text\" placeholder=\"Title\" ng-model=\"QuizzesCtrl.quiz.title\"></input><br/>\r\n\r\n  <div class=\"form-title\">Description</div>\r\n  <textarea class=\"form-field\" ng-model=\"QuizzesCtrl.quiz.description\" placeholder=\"Description\"></textarea><br/>\r\n\r\n  <div ng-show=\"QuizzesCtrl.quiz._id\">\r\n    <div class=\"form-title\">Status</div>\r\n    <select class=\"form-field\" name=\"status\" ng-model=\"QuizzesCtrl.quiz.status\">\r\n      <option value=\"0\" >Unactive</option>\r\n      <option value=\"1\">Active</option>\r\n    </select><br>\r\n  </div>\r\n\r\n  <div class=\"submit-container\">\r\n  <input class=\"submit-button\" type=\"submit\" value=\"Submit\" />\r\n  </div>\r\n</form>\r\n");
$templateCache.put("admin/users/_users.html","<div>\r\n  {{UsersCtrl.test}}\r\n</div>\r\n<div ng-repeat=\"user in UsersCtrl.users\">\r\n  <i class=\"fa fa-wrench\" ng-click=\'UsersCtrl.editUser(user)\'></i>\r\n  <a href=\"#/dashboard/{{user._id}}\">\r\n    {{user.name}}\r\n  </a>\r\n  - \r\n  <a href=\"#/dashboard/{{user._id}}\">\r\n    {{user.email}}\r\n  </a>\r\n  <small>createAt</small> {{user.createAt}}\r\n  | Notes: {{user.notes.length}}\r\n  | Quizzes: \r\n<!--   <span>\r\n    <a href=\"#/dashboard/{{user._id}}\">Notes</a>\r\n  </span> -->\r\n</div>\r\n<form ng-submit=\"UsersCtrl.addUser()\">\r\n  <input type=\"text\" placeholder=\"Name\" ng-model=\"UsersCtrl.user.name\"></input>\r\n  <br>\r\n  <input type=\"email\" placeholder=\"Email\" ng-model=\"UsersCtrl.user.email\"></input>\r\n  <br>\r\n  <input type=\"password\" placeholder=\"Password\" ng-model=\"UsersCtrl.user.password\"></input>\r\n  <br>\r\n  <input type=\"password\" placeholder=\"Repeat password\" ng-model=\"UsersCtrl.passwordRepeat\"></input>\r\n  <br>\r\n  <button type=\"submit\">Add User</button>\r\n</form>\r\n");
$templateCache.put("quizzes/list/_list.html","<div class=\"quizzes-header\">\r\n    <div class=\"quizzes-header__title\">Quizzes</div>\r\n\r\n    <form class=\"quizzes-header-selector\" method=\"get\" action=\"\">\r\n        <select name=\"category\" id=\"category\" class=\"quizzes-header-selector-item\" ng-model=\"RunQuizzesCtrl.selected\" ng-options=\"o._id as o.title for o in RunQuizzesCtrl.categories\" ng-change=\"RunQuizzesCtrl.getQuizzesByCategory()\">\r\n            <option value=\"All\">All categories</option>\r\n            <option value=\"HTMLnCSS\">HTML&amp;CSS</option>\r\n            <option value=\"JavaScript\">JavaScript</option>\r\n            <option value=\"Ruby\">Ruby</option>\r\n            <option value=\"Perl\">Perl</option>\r\n            <option value=\"Python\">Python</option>\r\n        </select>\r\n        <select name=\"difficulty\" id=\"difficulty\" class=\"quizzes-header-selector-item\">\r\n            <option value=\"All\">All difficulties</option>\r\n            <option value=\"Novice\">Novice</option>\r\n            <option value=\"Advanced\">Advanced</option>\r\n            <option value=\"Ruby\">Expert</option>\r\n        </select>\r\n        <select name=\"status\" id=\"status\" class=\"quizzes-header-selector-item\">\r\n            <option value=\"All\">All statuses</option>\r\n            <option value=\"Novice\">Passed</option>\r\n            <option value=\"Advanced\">non-Passed</option>\r\n        </select>\r\n    </form>\r\n</div>\r\n\r\n<div class=\"quizzes-selection\">\r\n    <table class=\"quizzes-selection-table\">\r\n        <tr class=\"quizzes-selection-table-row-heading\">\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Category</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Name</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Difficulty</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Avrg</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Best</th>\r\n            <th class=\"quizzes-selection-table-row-heading__title\">Total passing</th>\r\n        </tr>\r\n        <tr class=\"quizzes-selection-table-row-content\" ng-repeat=\"quiz in RunQuizzesCtrl.quizzes\" ng-click=\"QuizzesContainerCtrl.quizService.activeQuiz\r\n         = quiz._id;\">\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.category.title}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.title}}</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">quiz_difficulty</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">avrg_result</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">best_result</td>\r\n            <td class=\"quizzes-selection-table-row-content__title\">total_passing</td>\r\n        </tr>\r\n    </table>\r\n</div>");
$templateCache.put("quizzes/single/_quiz.html","<div class=\"quiz\">\r\n    <div class=\"quiz__title\">\r\n        {{passingQuizCtrl.quiz.title}}\r\n    </div>\r\n    <div class=\"quiz-counter\">\r\n      <span class=\"quiz-counter-indicator\">\r\n                  <span class=\"quiz-counter-indicator__item_current\" id=\"counter\">0</span\r\n                          ><span class=\"quiz-counter-indicator__item_separator\">/</span><span class=\"quiz-counter-indicator__item_total\">20</span>\r\n                </span\r\n                        >\r\n    </div>\r\n    \r\n        <form class=\"quiz-question-block\" id=\"slider\" ng-submit=\"PassingQuizCtrl.checkResult();\">\r\n            <div class=\"quiz-question-block-question\" ng-repeat=\"question in PassingQuizCtrl.quiz.questions\">\r\n                {{question.text}}\r\n                    <ul class=\"quiz-question-block-answers-list\">\r\n                        <li class=\"quiz-question-block-answers-list-item\" ng-repeat=\"answer in question.answers\">\r\n                            \r\n                            <input type=\"checkbox\" class=\"quiz-question-block-answers-list-item-answer__select\" ng-model=\"answer.userResult\" id=\"{{answer._id}}\" hidden\r\n                            ><label for=\"{{answer._id}}\" class=\"quiz-question-block-answers-list-item-answer__title\">{{answer.text}}</label>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            \r\n        </form>\r\n        <span>\r\n            {{PassingQuizCtrl.result}}\r\n        </span>\r\n    <button onclick=\"\">NEXT STEP</button>\r\n\r\n\r\n<div class=\"quiz-back\" ><a href=\"\" class=\"quiz-back__link\" ng-click=\"quizzesContainerCtrl.quizService.activeQuiz = null\">BACK TO ALL QUIZZES</a></div>\r\n\r\n</div>\r\n");}]);
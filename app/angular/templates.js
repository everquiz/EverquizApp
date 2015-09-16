angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("admin/index.html","<p>{{test}}</p>\n<div class=\"demoBtn raised green\">\n  <a ui-sref=\".users\"><div class=\"center\" fit>Users</div></a>\n</div> \n<div class=\"demoBtn raised green\">\n  <a ui-sref=\".quizzes\"><div class=\"center\" fit>Quizzes</div></a>\n</div>   \n<div class=\"demoBtn raised green\">\n  <a ui-sref=\".categories\"><div class=\"center\" fit>Categories</div></a>\n</div>   \n<ui-view></ui-view>");
$templateCache.put("auth/login.html","<div class=\"page-header\">\n  <h1>Login template</h1>\n</div>\n\n<div ng-show=\"AuthCtrl.error\" class=\"alert alert-danger row\">\n  <span>{{ AuthCtrl.error.message }}</span>\n</div>\n\n<form ng-submit=\"AuthCtrl.logIn()\"\n  style=\"margin-top:30px;\">\n  <h3>Log In</h3>\n\n  <div class=\"form-group\">\n    <input type=\"text\"\n    class=\"form-control\"\n    placeholder=\"email\"\n    ng-model=\"AuthCtrl.user.email\"></input>\n  </div>\n  <div class=\"form-group\">\n    <input type=\"password\"\n    class=\"form-control\"\n    placeholder=\"Password\"\n    ng-model=\"AuthCtrl.user.password\"></input>\n  </div>\n  <button type=\"submit\" class=\"btn btn-primary\">Log In</button>\n</form>");
$templateCache.put("auth/register.html","<div class=\"page-header\">\n  <h1>Registration template</h1>\n</div>\n\n<div ng-show=\"AuthCtrl.error\" class=\"alert alert-danger row\">\n  <span>{{ AuthCtrl.error.message }}</span>\n</div>\n\n<form ng-submit=\"AuthCtrl.register()\"\n  style=\"margin-top:30px;\">\n  <h3>Register</h3>\n\n  <div class=\"form-group\">\n    <input type=\"text\"\n    class=\"form-control\"\n    placeholder=\"email\"\n    ng-model=\"AuthCtrl.user.email\"></input>\n  </div>\n  <div class=\"form-group\">\n    <input type=\"password\"\n    class=\"form-control\"\n    placeholder=\"Password\"\n    ng-model=\"AuthCtrl.user.password\"></input>\n  </div>\n  <button type=\"submit\" class=\"btn btn-primary\">Register</button>\n</form>");
$templateCache.put("home/_getFail.html","get fail\n<hr>");
$templateCache.put("home/_getStarted.html","get started\n<hr>");
$templateCache.put("home/index.html","<div ui-view=\"header\"></div>\n<div ui-view=\"getStarted\"></div>\n<div ui-view=\"profile\" id=\"profile\"></div>\n<div ui-view=\"quizzes\"></div>\n<div ui-view=\"notes\"></div>\n<div ui-view=\"getFail\"></div>\n<div ui-view=\"footer\"></div>");
$templateCache.put("layouts/_footer.html","<a>&lt;EPAM&gt;</a>\n<footer>\n  <ul>\n    <li>t</li>\n    <li>f</li>\n    <li>in</li>\n    <li>g+</li>\n  </ul>\n</footer>\n<span>Developed by EPAM lab</span>");
$templateCache.put("layouts/_header.html","<ul>\n  <li><a ng-click=\"NavCtrl.goHome()\">HOME</a></li>\n  <li>VIDEO</li>\n  <li>QUIZZES</li>\n  <li ng-show=\"NavCtrl.isLoggedIn()\">NOTES</li>\n  <li>GET FAIL?</li>\n\n  <li ng-show=\"NavCtrl.isLoggedIn()\"><a ng-click=\"NavCtrl.showProfile()\">{{ NavCtrl.currentUser() }}</a></li>\n  <li ng-show=\"NavCtrl.isLoggedIn()\"><a href=\"\" ng-click=\"NavCtrl.logOut()\">Log Out</a></li>\n  <li ng-hide=\"NavCtrl.isLoggedIn()\"><a href=\"#/login\">Log In</a></li>\n  <li ng-hide=\"NavCtrl.isLoggedIn()\"><a href=\"#/register\">Register</a></li>\n</ul>\n<hr>");
$templateCache.put("profile/_notes.html","<div ng-show=\"NotesCtrl.isLoggedIn()\">\n  notes \"User logged\"\n  <hr>\n</div>\n");
$templateCache.put("profile/_profile.html","<!--<span ng-show=\"!profileCtrl.profile()\">video</span>-->\n<!--<span ng-show=\"profileCtrl.profile()\">profile</span>-->\n<!--<hr>-->\n<div ng-show=\"!ProfileCtrl.isVisible()\">video</div>\n<div class=\"l-wrapper\" ng-show=\"ProfileCtrl.isVisible()\">\n<div class=\"profile\">\n    <div class=\"profile-photo\">\n        <div class=\"profile-photo__image-outer\">\n            <img src=\"\" alt=\"Image\">\n        </div>\n    </div>\n    <div class=\"profile-content\">\n        <h1 class=\"profile-content__name\">{{ProfileCtrl.profile.name}}</h1>\n        <div class=\"profile-content-item\">\n            <span class=\"profile-content-item__header\">Total Passing:</span>\n            <span class=\"profile-content-item__value\">{{ProfileCtrl.profile.quizCompleted}}</span>\n        </div>\n        <div class=\"profile-content-item\">\n            <span class=\"profile-content-item__header\">Average result:</span>\n            <span class=\"profile-content-item__value\">{{ProfileCtrl.profile.averageResult}}</span>\n        </div>\n    </div>\n</div>\n</div>\n<hr>");
$templateCache.put("quizzes/_addQuiz.html","<div class=\"quiz\">\n  <div class=\"quiz-header\">\n    <p class=\"quiz-header__title\">Quiz title</p>\n    <p class=\"quiz-header__description\">Quiz description</p>\n  </div>\n  <div class=\"quiz__title\">\n    Quiz title\n  </div>\n  <div class=\"quiz-question-block\">\n      <div class=\"question-block__question\" ng-repeat=\"i in [0,1,2]\" style=\"display: inline-block; margin-left: 64px;\">\n        <input type=\"text\" class=\"question-block__question_add\" placeholder=\"Type question here\">\n      </div>\n  </div>\n\n    <form action=\"\" class=\"question-block-answers\" >\n      \n        <ul class=\"question-block-answers-list\" ng-repeat=\"i in [0,1,2]\"  style=\"display: inline-block; list-style: none;\">\n          <li class=\"question-block-answers-list-item\">\n              <input type=\"checkbox\" class=\"question-block-answers-list-item__correct\">\n              <input type=\"text\" class=\"question-block-answers-list-item\" placeholder=\"Type answer variant here\">\n          </li>\n          <li class=\"question-block-answers-list-item\">\n              <input type=\"checkbox\" class=\"question-block-answers-list-item__correct\">\n              <input type=\"text\" class=\"question-block-answers-list-item\" placeholder=\"Type answer variant here\">\n          </li>\n          <li class=\"question-block-answers-list-item\">\n              <input type=\"checkbox\" class=\"question-block-answers-list-item__correct\">\n              <input type=\"text\" class=\"question-block-answers-list-item\" placeholder=\"Type answer variant here\">\n          </li>\n          <li class=\"question-block-answers-list-item\">\n              <input type=\"checkbox\" class=\"question-block-answers-list-item__correct\">\n              <input type=\"text\" class=\"question-block-answers-list-item\" placeholder=\"Type answer variant here\">\n          </li>\n        </ul>\n        \n    </form>\n    \n  <div class=\"quiz-control\">\n    <button class=\"quiz-control__prev\">Previous</button>\n    <button class=\"quiz-control__next\">Next</button>\n  </div>\n\n  <div class=\"quiz-back\"><a href=\"quizzes.html\" class=\"quiz-back__link\">BACK TO ALL QUIZZES</a></div>\n  <div class=\"quiz-counter\">\n      <span class=\"quiz-counter-indicator\">\n        <span class=\"quiz-counter-indicator__item quiz-counter-indicator__item_current\">7</span\n        ><span class=\"quiz-counter-indicator__item quiz-counter-indicator__item_separator\">/</span\n        ><span class=\"quiz-counter-indicator__item quiz-counter-indicator__item_total\">20</span>\n      </span>\n  </div>\n</div>  ");
$templateCache.put("quizzes/_quizzes.html","<div ui-view=\"list\" ng-if=\"!QuizzesContainerCtrl.quizService.activeQuiz\"></div>\n<div ui-view=\"quiz\" ng-if=\"QuizzesContainerCtrl.quizService.activeQuiz\"></div>");
$templateCache.put("admin/categories/_categories.html","<div class=\"quizzes-header\">\n    <div class=\"quizzes-header__title\">Categories</div>\n</div>\n\n<div class=\"quizzes-selection\">\n    <table class=\"quizzes-selection-table\">\n        <tr class=\"quizzes-selection-table-row-heading\">\n            <th class=\"quizzes-selection-table-row-heading__title\">Title</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Description</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Actions</th>\n        </tr>\n        <tr class=\"quizzes-selection-table-row-content\" ng-repeat=\"category in CategoriesCtrl.categories\">\n            <td class=\"quizzes-selection-table-row-content__title\">{{category.title}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">{{category.description}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\"><i class=\"fa fa-trash-o\" ng-click=\'CategoriesCtrl.removeCategory(category)\'></i>  <i class=\"fa fa-wrench\" ng-click=\'CategoriesCtrl.editCategory(category)\'></i></td>\n        </tr>\n    </table>\n</div>\n\n<form ng-submit=\"CategoriesCtrl.addCategory()\" style=\"margin: 30px auto 0;\" class=\"form-container\">\n  <div class=\"form-title\"><h2>Add new category</h2></div>\n\n  <div class=\"form-title\">Title</div>\n  <input class=\"form-field\" type=\"text\" placeholder=\"Title\" ng-model=\"CategoriesCtrl.category.title\"></input><br/>\n\n  <div class=\"form-title\">Description</div>\n  <textarea class=\"form-field\" ng-model=\"CategoriesCtrl.category.description\" placeholder=\"Description\"></textarea><br/>\n\n  <div class=\"submit-container\">\n  <input class=\"submit-button\" type=\"submit\" value=\"Submit\" />\n  </div>\n</form>");
$templateCache.put("admin/question/_question.html","<div class=\"quizzes-header\">\n    <div class=\"quizzes-header__title\">{{QuestionCtrl.question.text}}</div>\n</div>\n<div class=\"quizzes-header\">\n    <div class=\"quizzes-header__title\">Answers</div>\n</div>\n\n<div class=\"quizzes-selection\">\n    <table class=\"quizzes-selection-table\">\n        <tr class=\"quizzes-selection-table-row-heading\">\n            <th class=\"quizzes-selection-table-row-heading__title\">Text</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">ID</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">createAt</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Correct</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Actions</th>\n        </tr>\n        <tr class=\"quizzes-selection-table-row-content\" ng-repeat=\"answer in QuestionCtrl.question.answers\">\n            <td class=\"quizzes-selection-table-row-content__title\">{{answer.text}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">{{answer._id}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">{{answer.createAt}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">{{answer.correct}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\"><i class=\"fa fa-trash-o\" ng-click=\'QuestionCtrl.removeAnswer(answer)\'></i><i class=\"fa fa-wrench\" ng-click=\'QuestionCtrl.editAnswer(answer)\'></i></td>\n        </tr>\n    </table>\n</div>\n\n\n<!-- <h2>\n  {{questionCtrl.question.text}}\n</h2>\n<h3>\n  Answers:\n</h3>\n<div ng-repeat=\"answer in questionCtrl.question.answers\">\n  <i class=\"fa fa-trash-o\" ng-click=\'questionCtrl.removeAnswer(answer)\'></i>\n  <i class=\"fa fa-wrench\" ng-click=\'questionCtrl.editAnswer(answer)\'></i>\n  <a href=\"#/question/{{question._id}}/question/{{question._id}}\">\n    {{answer.text}}\n  </a>\n  - {{answer.correct}}\n  <small>createAt</small> {{question.createAt}}\n\n</div> -->\n\n<!-- post template -->\n\n<!-- <form ng-submit=\"questionCtrl.addAnswer()\"\n  style=\"margin-top:30px;\">\n  <h3>Add new/edit answer</h3>\n\n  <input type=\"text\" placeholder=\"Text of question\" ng-model=\"answer.text\"></input><br/>\n\n  <label for=\"correct\">is this a correct answer?</label>\n  <input name=\"correct\" type=\"checkbox\"\n  ng-model=\"answer.correct\"></input><br/>\n\n  <button type=\"submit\">go</button>\n</form> -->\n\n<form ng-submit=\"QuestionCtrl.addAnswer()\" style=\"margin: 30px auto 0;\" class=\"form-container\">\n  <div class=\"form-title\"><h2>Add new/edit answer</h2></div>\n\n  <div class=\"form-title\">Text</div>\n  <textarea class=\"form-field\" ng-model=\"QuestionCtrl.answer.text\" placeholder=\"Text\"></textarea><br/>\n\n  <div class=\"form-title\">Is correct?</div>\n  <input name=\"correct\" type=\"checkbox\"\n  ng-model=\"QuestionCtrl.answer.correct\"></input><br/>\n\n  <div class=\"submit-container\">\n  <input class=\"submit-button\" type=\"submit\" value=\"Submit\" />\n  </div>\n</form>\n");
$templateCache.put("admin/quiz/_quiz.html","<div class=\"quizzes-header\">\n    <div class=\"quizzes-header__title\">{{QuizCtrl.quiz.title}}</div>\n</div>\n<div class=\"quizzes-header\">\n    <div class=\"quizzes-header__title\">Questions</div>\n</div>\n\n<div class=\"quizzes-selection\">\n    <table class=\"quizzes-selection-table\">\n        <tr class=\"quizzes-selection-table-row-heading\">\n            <th class=\"quizzes-selection-table-row-heading__title\">Text</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">ID</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">createAt</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Total Answers</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Actions</th>\n        </tr>\n        <tr class=\"quizzes-selection-table-row-content\" ng-repeat=\"question in QuizCtrl.quiz.questions\">\n            <td class=\"quizzes-selection-table-row-content__title\">{{question.text}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\"  ui-sref=\"admin.question({ id: question._id})\">{{question._id}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">{{question.createAt}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">{{question.answers.length}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\"><i class=\"fa fa-trash-o\"  ng-click=\'QuizCtrl.removeQuestion(question)\'></i><i class=\"fa fa-wrench\" ng-click=\'QuizCtrl.editQuestion(question)\'></i></td>\n        </tr>\n    </table>\n</div>\n\n<!-- post template -->\n<!-- <form ng-submit=\"quizCtrl.addQuestion()\"\n  style=\"margin-top:30px;\">\n  <h3>Add new question</h3>\n\n  <input type=\"text\" placeholder=\"Text of question\" ng-model=\"question.text\"></input><br/>\n  \n  <button type=\"submit\">New question</button>\n</form> -->\n<form ng-submit=\"QuizCtrl.addQuestion()\" style=\"margin: 30px auto 0;\" class=\"form-container\">\n  <div class=\"form-title\"><h2>Add new question</h2></div>\n\n  <div class=\"form-title\">Text</div>\n  <textarea class=\"form-field\" ng-model=\"QuizCtrl.question.text\" placeholder=\"Text\"></textarea><br/>\n\n  <div class=\"submit-container\">\n  <input class=\"submit-button\" type=\"submit\" value=\"Submit\" />\n  </div>\n</form>\n");
$templateCache.put("admin/quizzes/_quizzes.html","<div class=\"quizzes-header\">\n    <div class=\"quizzes-header__title\">Quizzes</div>\n</div>\n\n<div class=\"quizzes-selection\">\n    <table class=\"quizzes-selection-table\">\n        <tr class=\"quizzes-selection-table-row-heading\">\n            <th class=\"quizzes-selection-table-row-heading__title\">Category</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Name</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Description</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">createAt</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Status</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Total questions</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Actions</th>\n        </tr>\n        <tr class=\"quizzes-selection-table-row-content\" ng-repeat=\"quiz in QuizzesCtrl.quizzes\">\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.category.title}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\"  ui-sref=\"admin.quiz({ id: quiz._id})\">{{quiz.title}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.description}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.createAt}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">{{QuizzesCtrl.getStatus(quiz.status)}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.questions.length}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\"><i class=\"fa fa-trash-o\" ng-click=\'QuizzesCtrl.deactivateQuiz(quiz)\'></i>  <i class=\"fa fa-play\" ng-click=\'QuizzesCtrl.activateQuiz(quiz)\'></i>  <i class=\"fa fa-wrench\" ng-click=\'quizzesCtrl.editQuiz(quiz)\'></i></td>\n        </tr>\n    </table>\n</div>\n\n<!-- <form ng-submit=\"quizzesCtrl.addQuiz()\" style=\"margin-top:30px;\">\n  <h3>Add new quiz</h3>\n\n  <label for=\"category\"> Category: </label><br>\n  <select name=\"category\" ng-model=\"quiz.category\"ng-options=\"o._id as o.title for o in quizzesCtrl.categories\"></select><br/>\n  <input type=\"text\" placeholder=\"Title\" ng-model=\"quiz.title\"></input><br/>\n  <textarea ng-model=\"quiz.description\" placeholder=\"Description\"></textarea><br/>\n  <div ng-show=\"quiz._id\">\n    <label for=\"status\"> Status: </label><br>\n    <select name=\"status\" ng-model=\"quiz.status\">\n      <option value=\"0\" >Unactive</option>\n      <option value=\"1\">Active</option>\n    </select><br>\n  </div>\n  \n  <button type=\"submit\">New quiz</button>\n</form> -->\n<form ng-submit=\"QuizzesCtrl.addQuiz()\" style=\"margin: 30px auto 0;\" class=\"form-container\">\n  <div class=\"form-title\"><h2>Add new quiz</h2></div>\n\n  <div class=\"form-title\">Category:</div>\n  <select class=\"form-field\" name=\"category\" ng-model=\"QuizzesCtrl.quiz.category\"ng-options=\"o._id as o.title for o in QuizzesCtrl.categories\"></select>\n\n  <div class=\"form-title\">Title</div>\n  <input class=\"form-field\" type=\"text\" placeholder=\"Title\" ng-model=\"QuizzesCtrl.quiz.title\"></input><br/>\n\n  <div class=\"form-title\">Description</div>\n  <textarea class=\"form-field\" ng-model=\"QuizzesCtrl.quiz.description\" placeholder=\"Description\"></textarea><br/>\n\n  <div ng-show=\"QuizzesCtrl.quiz._id\">\n    <div class=\"form-title\">Status</div>\n    <select class=\"form-field\" name=\"status\" ng-model=\"QuizzesCtrl.quiz.status\">\n      <option value=\"0\" >Unactive</option>\n      <option value=\"1\">Active</option>\n    </select><br>\n  </div>\n\n  <div class=\"submit-container\">\n  <input class=\"submit-button\" type=\"submit\" value=\"Submit\" />\n  </div>\n</form>\n");
$templateCache.put("admin/users/_users.html","<div>\n  {{UsersCtrl.test}}\n</div>\n<div ng-repeat=\"user in UsersCtrl.users\">\n  <i class=\"fa fa-wrench\" ng-click=\'UsersCtrl.editUser(user)\'></i>\n  <a href=\"#/dashboard/{{user._id}}\">\n    {{user.name}}\n  </a>\n  - \n  <a href=\"#/dashboard/{{user._id}}\">\n    {{user.email}}\n  </a>\n  <small>createAt</small> {{user.createAt}}\n  | Notes: {{user.notes.length}}\n  | Quizzes: \n<!--   <span>\n    <a href=\"#/dashboard/{{user._id}}\">Notes</a>\n  </span> -->\n</div>\n<form ng-submit=\"UsersCtrl.addUser()\">\n  <input type=\"text\" placeholder=\"Name\" ng-model=\"UsersCtrl.user.name\"></input>\n  <br>\n  <input type=\"email\" placeholder=\"Email\" ng-model=\"UsersCtrl.user.email\"></input>\n  <br>\n  <input type=\"password\" placeholder=\"Password\" ng-model=\"UsersCtrl.user.password\"></input>\n  <br>\n  <input type=\"password\" placeholder=\"Repeat password\" ng-model=\"UsersCtrl.passwordRepeat\"></input>\n  <br>\n  <button type=\"submit\">Add User</button>\n</form>\n");
$templateCache.put("quizzes/list/_list.html","<div class=\"quizzes-header\">\n    <div class=\"quizzes-header__title\">Quizzes</div>\n\n    <form class=\"quizzes-header-selector\" method=\"get\" action=\"\">\n        <select name=\"category\" id=\"category\" class=\"quizzes-header-selector-item\" ng-model=\"RunQuizzesCtrl.selected\" ng-options=\"o._id as o.title for o in RunQuizzesCtrl.categories\" ng-change=\"RunQuizzesCtrl.getQuizzesByCategory()\">\n            <option value=\"All\">All categories</option>\n            <option value=\"HTMLnCSS\">HTML&amp;CSS</option>\n            <option value=\"JavaScript\">JavaScript</option>\n            <option value=\"Ruby\">Ruby</option>\n            <option value=\"Perl\">Perl</option>\n            <option value=\"Python\">Python</option>\n        </select>\n        <select name=\"difficulty\" id=\"difficulty\" class=\"quizzes-header-selector-item\">\n            <option value=\"All\">All difficulties</option>\n            <option value=\"Novice\">Novice</option>\n            <option value=\"Advanced\">Advanced</option>\n            <option value=\"Ruby\">Expert</option>\n        </select>\n        <select name=\"status\" id=\"status\" class=\"quizzes-header-selector-item\">\n            <option value=\"All\">All statuses</option>\n            <option value=\"Novice\">Passed</option>\n            <option value=\"Advanced\">non-Passed</option>\n        </select>\n    </form>\n</div>\n\n<div class=\"quizzes-selection\">\n    <table class=\"quizzes-selection-table\">\n        <tr class=\"quizzes-selection-table-row-heading\">\n            <th class=\"quizzes-selection-table-row-heading__title\">Category</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Name</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Difficulty</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Avrg</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Best</th>\n            <th class=\"quizzes-selection-table-row-heading__title\">Total passing</th>\n        </tr>\n        <tr class=\"quizzes-selection-table-row-content\" ng-repeat=\"quiz in RunQuizzesCtrl.quizzes\" ng-click=\"QuizzesContainerCtrl.quizService.activeQuiz\n         = quiz._id;\">\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.category.title}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">{{quiz.title}}</td>\n            <td class=\"quizzes-selection-table-row-content__title\">quiz_difficulty</td>\n            <td class=\"quizzes-selection-table-row-content__title\">avrg_result</td>\n            <td class=\"quizzes-selection-table-row-content__title\">best_result</td>\n            <td class=\"quizzes-selection-table-row-content__title\">total_passing</td>\n        </tr>\n    </table>\n</div>");
$templateCache.put("quizzes/single/_quiz.html","<div class=\"quiz\">\n    <div class=\"quiz__title\">\n        {{PassingQuizCtrl.quiz.title}}\n    </div>\n    <div class=\"quiz-counter\">\n      <span class=\"quiz-counter-indicator\">\n                  <span class=\"quiz-counter-indicator__item quiz-counter-indicator__item_current\">7</span\n                          ><span class=\"quiz-counter-indicator__item quiz-counter-indicator__item_separator\">/</span><span class=\"quiz-counter-indicator__item quiz-counter-indicator__item_total\">20</span>\n                </span>\n    </div>\n    <div class=\"quiz-question-block\">\n        <form class=\"question-form\" ng-submit=\"PassingQuizCtrl.checkResult();\">\n            <div class=\"quiz-question-block-question\" ng-repeat=\"question in PassingQuizCtrl.quiz.questions\">\n                {{question.text}}\n                <ul class=\"quiz-question-block-answers-list\">\n                    <li class=\"quiz-question-block-answers-list-item\" ng-repeat=\"answer in question.answers\">\n                        <label class=\"quiz-question-block-answers-list-item-answer__title\">\n                            <input type=\"checkbox\" class=\"quiz-question-block-answers-list-item-answer__select\" ng-model=\"answer.userResult\">\n                            {{answer.text}}\n                        </label>\n                    </li>\n                </ul>\n            </div>\n            <input type=\"submit\">\n        </form>\n        <span>\n            {{PassingQuizCtrl.result}}\n        </span>\n    </div>\n    <div class=\"quiz-back\" ><a href=\"\" class=\"quiz-back__link\" ng-click=\"QuizzesContainerCtrl.quizService.activeQuiz = null\">BACK TO ALL QUIZZES</a></div>\n\n</div>");}]);
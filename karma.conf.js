// Karma configuration
// Generated on Wed Sep 30 2015 12:34:58 GMT+0300 (EEST)

module.exports = function(config) {
  config.set({

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: './',


      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['mocha', 'chai'],


      // list of files / patterns to load in the browser
      files: [
          'bower_components/angular/angular.js',
          'bower_components/angular-mocks/angular-mocks.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/angular-bootstrap/ui-bootstrap.js',
          'bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/ngDialog/js/ngDialog.js',
          'bower_components/Chart.js/Chart.js',
          'bower_components/angular-chart.js/angular-chart.js',
          'app/angularApp.js',
          'app/**/*Service.js',
          'app/**/*Factory.js',
          'app/routes.js',
          'app/**/*Controller.js',
          'app/**/*.html',
          'tests/**/*.spec.js'
      ],


      // list of files to exclude
      exclude: [],

      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        'app/**/*.html': ['ng-html2js']
      },

      ngHtml2JsPreprocessor: {
        // we want all templates to be loaded in the same module called 'templates'
        moduleName: 'templates'
      },


      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress', 'html'],


      // the default configuration 
      htmlReporter: {
        outputFile: 'tests/units.html'
      },

      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // // level of logging
      // // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      // logLevel: config.LOG_INFO,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,


      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['PhantomJS'],


      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: false,

      plugins: [
          'karma-phantomjs-launcher',
          'karma-mocha',
          'karma-chai',
          'karma-htmlfile-reporter',
          'karma-ng-html2js-preprocessor'
      ]
  })
  };
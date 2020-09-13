
module.exports = function (config) {

  config.set({

    frameworks: ['mocha', 'sinon', 'chai'],

    basePath: './',

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'client/app/game-of-life/game-of-life.module.js',
      {pattern: 'client/app/**/*.js', watched: true, included: true, served: true}
    ],

    preprocessors: {
      'client/app/**/*.js': ['coverage']
    },

    reporters: ['spec', 'coverage', 'spec-tally'],

    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: false,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: true,  // do not print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },

    // optionally, configure the reporter 
    coverageReporter: {
      type: 'html',
      dir: 'reports/coverage'
    },

    specTallyReporter: {
      console: false, // show error logs on console
      fileName: 'spec-tally-report',
      ext: 'json',
      outDir: 'reports/spec-tally-report',
      writeLog: false, // write logs to given fileName
      bail: false // invokes process.exit if spec tally mismatch
    },

    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browsers: ['ChromeHeadless'],

    singleRun: true,

    autoWatch: false,

    concurrency: Infinity,

    failOnEmptyTestSuite: true,

    // reports all specs slower than given value in ms.
    reportSlowerThan: 20,

    background: false,

    // increased timeout, waits for webpack to compile
    browserNoActivityTimeout: 60000

  });

};

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon', 'chai', '@angular/cli'],
    plugins: [
      require('karma-mocha'),
      require('karma-sinon'),
      require('karma-chai'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-spec-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    coverageReporter: {
      type : 'html',
      dir : 'reports/coverage'
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
      dir: __dirname + '/reports/coverage',
      'report-config': {
        html: {
          subdir: 'html'
        }
      },
      thresholds: {
        emitWarning: false,
        global: {
          statements: 90,
          lines: 90,
          branches: 90,
          functions: 90
        },
        each: {
          statements: 90,
          lines: 90,
          branches: 90,
          functions: 90,
        }
      }
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  });
};

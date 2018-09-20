// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {

  allScriptsTimeout: 11000,
  specs: [
    './e2e/features/**/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },

  directConnect: true,
  baseUrl: 'http://localhost:4200/',

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  cucumberOpts: {
    require: 'e2e/features/step-definitions/**/*.e2e-spec.ts',
    tags: '@smoke',
    format: ['json:reports/e2e/coverage.json', 'node_modules/cucumber-pretty'],
    formatOptions: {
      pretty: {
        passed: true,
        summary: true
      },
      colorsEnabled: true
    },
    profile: false,
    'no-source': true
  },
  
  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options: {
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true
    }
  }],

  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  }

};

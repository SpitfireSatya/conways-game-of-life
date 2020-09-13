
exports.config = {

  // seleniumAddress: 'http://localhost:4444/wd/hub',  

  baseURL: 'http://localhost:9000/',

  getPageTimeout: 60000,

  allScriptsTimeout: 500000,

  directConnect: true,

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  capabilities: {
    browserName: 'chrome'
  },

  // Spec patterns are relative to this directory.
  specs: ['e2e/features/**/*.feature'],

  cucumberOpts: require('./cucumber.conf'),

  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options: {
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true
    }
  }]

};

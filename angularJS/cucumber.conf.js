
module.exports = {
  require: 'e2e/features/step-definitions/**/*.step.js',
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
}

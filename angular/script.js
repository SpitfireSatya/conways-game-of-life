
(function () {
  'use strict';

  const tslintHtmlReport = require('tslint-html-report');

  const config = {
    srcFiles: 'src/**/*.ts', // files to lint
    outDir: 'reports/tslint-html-report', // output folder to write the report to.
    html: 'tslint-report.html', // name of the html report generated
    exclude: [],
    breakOnError: true, // Should it throw an error in tslint errors are found.
    typeCheck: true,
    tsconfig: 'tsconfig.json'
  }
  
  tslintHtmlReport(config);
  
}());

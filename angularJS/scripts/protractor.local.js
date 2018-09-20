
(function () {
  'use strict';

  var browserSync = require('browser-sync');
  var bsConfig = require('../browserSync.config');
  var protractorLauncher = require('protractor/built/launcher');

  bsConfig.open = false;
  
  function browserSyncInitCb () {
    var protractor = protractorLauncher.init('protractor.conf');
    process.on('exit', function () {
      browserSync.exit()
    });
  }

  browserSync.init(bsConfig, browserSyncInitCb);

}());
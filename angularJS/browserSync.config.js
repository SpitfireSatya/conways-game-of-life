
module.exports = {
  "ui": {
    "port": 9000,
    "weinre": {
      "port": 9001
    }
  },
  "files": [
    "client/app/**/*.js"
  ],
  "watchEvents": [
    "add", "change", "unlink", "addDir", "unlinkDir"
  ],
  "watchOptions": {
    "ignoreInitial": true
  },
  "server": {
    baseDir: "client",
    routes: {
      "/bower_components": "client/bower_components",
      "/node_modules": "node_modules",
      "/assets": "client/assets"
    }
  },
  "proxy": false,
  "port": 9000,
  "middleware": false,
  "serveStatic": [],
  "logLevel": "info",
  "logPrefix": "Browser-sync",
  "logConnections": false,
  "logFileChanges": true,
  "logSnippet": true,
  "rewriteRules": [],

  "open": "local",
  "browser": "default",
  "ghost": false,

  "cors": false,
  "xip": false,
  "hostnameSuffix": false,
  "reloadOnRestart": false,
  "notify": true,
  "scrollProportionally": true,
  "scrollThrottle": 0,
  "scrollRestoreTechnique": "window.name",
  "scrollElements": [],
  "scrollElementMapping": [],
  "reloadDelay": 0,
  "reloadDebounce": 0,
  "reloadThrottle": 0,
  "plugins": [],
  "injectChanges": true,
  "startPath": null,
  "minify": false,
  "host": null,
  "localOnly": false,
  "codeSync": true,
  "timestamps": true,
};
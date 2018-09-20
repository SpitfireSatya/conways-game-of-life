
(function (angular) {

  angular.module('gameOfLife')
    .constant('GameConstants', {
      urls: {
        PRESET_PATTERN: '/assets/mocks/preset-patterns.json'
      },
      tile: Object.freeze({
        dead: 0,
        alive: 1
      })
    });

})(window.angular);

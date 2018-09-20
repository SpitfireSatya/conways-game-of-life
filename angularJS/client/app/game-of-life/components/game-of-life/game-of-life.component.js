
(function (angular) {
  'use strict';

  angular.module('gameOfLife')
    .component('gameOfLife', {
      templateUrl: 'app/game-of-life/components/game-of-life/game-of-life.component.html',
      controllerAs: 'vm',
      controller: 'GameOfLifeController'
    });

})(window.angular);

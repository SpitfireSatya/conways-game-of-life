
(function (angular) {
  'use strict';

  function GameOfLifeService(gameUtils, $http, gameConstants, $log) {

    var service = this;
    service.model = {};

    function initialize(initialStates, gridHeight, gridWidth) {

      if (initialStates.length < gridHeight * gridWidth) {
        var padStartIndex = initialStates.length;
        initialStates.length = gridHeight * gridWidth;
        initialStates.fill(0, padStartIndex);
      }
      service.model.gridHeight = gridHeight;
      service.model.gridWidth = gridWidth;
      service.model.displayMatrix = gameUtils
        .generateMatrixFromArray(initialStates, gridHeight, gridWidth);
      service.model.zeroPaddedMatrix = gameUtils
        .padZerosAroundMatrix(service.model.displayMatrix, gridHeight, gridWidth);

    }

    function matrixAccumulator(inputMatrix) {

      var sunOfMatrix = 0;
      var flattenedMatrix = inputMatrix.reduce(function (aaccumulator, nextElement) {
        return aaccumulator.concat(nextElement);
      }, []);

      sunOfMatrix = flattenedMatrix.reduce(function (aaccumulator, nextElement) {
        return aaccumulator + nextElement;
      }, 0);
      
      return sunOfMatrix;

    }

    function computeNewState(row, col) {

      var currentTileValue = service.model.zeroPaddedMatrix[row][col];
      var croppedMatrix = gameUtils.cropMatrix(service.model.zeroPaddedMatrix, row - 1, col - 1,
        row + 2, col + 2);
      var neighborsAlive = matrixAccumulator(croppedMatrix) - currentTileValue;
      var newTileValue = -1;

      if (gameUtils.tile.isAlive(currentTileValue) && (neighborsAlive !== 2 && neighborsAlive !== 3)) {
        newTileValue = gameConstants.tile.dead;
      }
      else if (gameUtils.tile.isDead(currentTileValue) && neighborsAlive === 3) {
        newTileValue = gameConstants.tile.alive;
      }
      else {
        newTileValue = currentTileValue;
      }

      return newTileValue;

    }

    function updateGameStates() {

      var zeroPaddedMatrixClone = gameUtils.cropMatrix(service.model.zeroPaddedMatrix, 0, 0,
        service.model.gridHeight + 2, service.model.gridWidth + 2);
      for (var i = 1; i < service.model.gridHeight + 1; i++) {
        for (var j = 1; j < service.model.gridWidth + 1; j++) {
          zeroPaddedMatrixClone[i][j] = computeNewState(i, j);
        }
      }
      service.model.zeroPaddedMatrix = zeroPaddedMatrixClone;
      service.model.displayMatrix = gameUtils.removePaddingAroundMatrix(service.model.zeroPaddedMatrix);

    }

    function fetchPresetPatterns() {
      $http.get(gameConstants.urls.PRESET_PATTERN)
        .then(function (response) {
          service.model.presets = response.data;
        })
        .catch(function (error) {
          $log.log('Failed to load resource: ', error);
        });
    }

    service.initialize = initialize;
    service.updateGameStates = updateGameStates;
    service.fetchPresetPatterns = fetchPresetPatterns;

  }

  GameOfLifeService.$inject = ['GameUtils', '$http', 'GameConstants', '$log'];

  angular.module('gameOfLife')
    .service('GameOfLifeService', GameOfLifeService);

})(window.angular);

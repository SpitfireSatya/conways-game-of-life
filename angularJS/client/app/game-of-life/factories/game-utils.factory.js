
(function (angular) {
  'use strict';

  function GameUtils(gameConstants) {

    function generateMatrixFromArray(inputPattern, height, width) {

      var generatedMatrix = [];

      for (var i = 0; i < height; i++) {
        generatedMatrix.push(inputPattern.slice(i * width, (i * width) + width));
      }

      return generatedMatrix;

    }

    function padZerosAroundMatrix(inputMatrix, height, width) {

      var inputMatrixCopy = inputMatrix.slice().map(function (row) {
        return row.slice();
      });
      var zeroPaddedMatrix = [];

      zeroPaddedMatrix.push(new Array(width + 2).fill(0));

      for (var i = 0; i < height; i++) {
        inputMatrixCopy[i].unshift(0);
        inputMatrixCopy[i].push(0);
        zeroPaddedMatrix.push(inputMatrixCopy[i]);
      }

      zeroPaddedMatrix.push(new Array(width + 2).fill(0));

      return zeroPaddedMatrix;

    }

    function removePaddingAroundMatrix(inputMatrix) {

      return inputMatrix.slice(1, inputMatrix.length - 1).map(function (row) {
        return row.slice(1, row.length - 1);
      });

    }

    function cropMatrix(inputMatrix, firstRow, firstCol, lastRow, lastCol) {

      return inputMatrix.slice(firstRow, lastRow).map(function (row) {
        return row.slice(firstCol, lastCol);
      });

    }

    function isAlive(gameTile) {
      return gameTile === gameConstants.tile.alive;
    }

    function isDead(gameTile) {
      return gameTile === gameConstants.tile.dead;
    }

    return {
      generateMatrixFromArray: generateMatrixFromArray,
      padZerosAroundMatrix: padZerosAroundMatrix,
      removePaddingAroundMatrix: removePaddingAroundMatrix,
      cropMatrix: cropMatrix,
      tile: {
        isAlive: isAlive,
        isDead: isDead
      }
    };

  }

  GameUtils.$inject = ['GameConstants'];

  angular.module('gameOfLife')
    .factory('GameUtils', GameUtils);

})(window.angular);

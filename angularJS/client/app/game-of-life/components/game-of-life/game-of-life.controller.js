
(function (angular) {
  'use strict';

  function GameOfLifeController(gameOfLifeService, $interval, gameUtils, gameConstants) {

    var vm = this;

    function toggleTileValue(row, col) {

      var currentTileValue = vm.gameData.displayMatrix[row][col];

      if (!vm.gameRunning) {
        vm.gameData.displayMatrix[row][col] =
          gameUtils.tile.isAlive(currentTileValue) ? gameConstants.tile.dead : gameConstants.tile.alive;  
        vm.gameData.zeroPaddedMatrix[row + 1][col + 1] =
          gameUtils.tile.isAlive(currentTileValue) ? gameConstants.tile.dead : gameConstants.tile.alive;
      }

    }

    function generateEmptyGrid() {
      var emptyGridPattern = new Array(vm.gridHeight * vm.gridWidth).fill(gameConstants.tile.dead);
      gameOfLifeService.initialize(emptyGridPattern, vm.gridHeight, vm.gridWidth);
    }

    function runSingleTick() {
      vm.gameRunning = true;
      gameOfLifeService.updateGameStates();
      vm.gameRunning = false;
    }

    function runFiveTicks() {
      vm.gameRunning = true;
      vm.gameRunner = $interval(gameOfLifeService.updateGameStates, 500, 5);
      vm.gameRunner
        .then(function () {
          vm.gameRunning = false;
        });
    }

    function runContinuous() {
      if (vm.gameRunning) {
        vm.gameRunning = false;
        $interval.cancel(vm.gameRunner);
        vm.gameRunner = undefined;
      }
      else {
        vm.gameRunning = true;
        vm.gameRunner = $interval(gameOfLifeService.updateGameStates, 500);
      }
    }

    function loadSelectedPreset() {
      if (parseInt(vm.selectedPresetIndex, 10) > -1) {
        var selectedPresetObject = vm.gameData.presets[vm.selectedPresetIndex];
        var flattenedMatrix = selectedPresetObject.matrix.reduce(function (accumulator, nextElement) {
          return accumulator.concat(nextElement);
        }, []);
        gameOfLifeService.initialize(flattenedMatrix, selectedPresetObject.height, selectedPresetObject.width);
      }
    }

    function $onInit() {

      vm.gridHeight = 5;
      vm.gridWidth = 5;
      vm.gameData = gameOfLifeService.model;
      vm.gameRunning = false;
      vm.gameRunner = undefined;
      vm.selectedPresetIndex = -1;
      generateEmptyGrid();
      gameOfLifeService.fetchPresetPatterns();

    }

    vm.$onInit = $onInit;
    vm.toggleTileValue = toggleTileValue;
    vm.generateEmptyGrid = generateEmptyGrid;
    vm.runSingleTick = runSingleTick;
    vm.runFiveTicks = runFiveTicks;
    vm.runContinuous = runContinuous;
    vm.loadSelectedPreset = loadSelectedPreset;

  }

  GameOfLifeController.$inject = ['GameOfLifeService', '$interval', 'GameUtils', 'GameConstants'];

  angular.module('gameOfLife')
    .controller('GameOfLifeController', GameOfLifeController);

})(window.angular);

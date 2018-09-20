
/* eslint max-nested-callbacks: ["off", 0] */
describe('app', function () {
  describe('game-of-life', function () {
    describe('components', function () {
      describe('gameOfLifeComponent', function () {

        var $scope, gameOfLifeController, $componentController, gameOfLifeService, $interval;
        var initStub, updateStub, fetchPresetStub;

        beforeEach(angular.mock.module('gameOfLife'));

        beforeEach(inject(function ($rootScope, _$componentController_, GameOfLifeService, _$interval_) {
          $scope = $rootScope.$new();
          $componentController = _$componentController_;
          gameOfLifeService = GameOfLifeService;
          $interval = _$interval_;
        }));

        function getController() {

          var ctrl;

          ctrl = $componentController('gameOfLife', {
            $scope: $scope,
            gameOfLifeService: gameOfLifeService,
            $interval: $interval
          }, {});

          return ctrl;

        }

        beforeEach(function () {

          initStub = sinon.stub(gameOfLifeService, 'initialize');
          updateStub = sinon.stub(gameOfLifeService, 'updateGameStates');
          fetchPresetStub = sinon.stub(gameOfLifeService, 'fetchPresetPatterns');

          gameOfLifeController = getController();

        });

        afterEach(function () {
          initStub.restore();
          updateStub.restore();
          fetchPresetStub.restore();
        });

        describe('initialization: $onInit()', function () {

          it('should initialize grid height to 5', function () {

            gameOfLifeController.$onInit();

            expect(gameOfLifeController.gridHeight).to.equal(5);

          });

          it('should initialize grid width to 5', function () {

            gameOfLifeController.$onInit();

            expect(gameOfLifeController.gridWidth).to.equal(5);

          });

          it('should initialize gameRunning to false', function () {

            gameOfLifeController.$onInit();

            expect(gameOfLifeController.gameRunning).to.equal(false);

          });

          it('should initialize gameRunner to undefined', function () {

            gameOfLifeController.$onInit();

            expect(gameOfLifeController.gameRunner).to.equal(undefined);

          });

          it('should initialize selectedPresetIndex to -1', function () {

            gameOfLifeController.$onInit();

            expect(gameOfLifeController.selectedPresetIndex).to.equal(-1);

          });

          it('should invoke gameOfLifeService.initialize with an empty grid of 5x5', function () {

            gameOfLifeController.$onInit();

            sinon.assert.calledWithExactly(initStub, new Array(25).fill(0), 5, 5);

          });

          it('should invoke gameOfLifeService.fetchPresetPatterns', function () {

            gameOfLifeController.$onInit();

            sinon.assert.calledOnce(fetchPresetStub);

          });

        });

        describe('toggleTileValue()', function () {

          it('should change the value of element in display and zero padded matrix to zero if it is one', function () {

            gameOfLifeController.gameData = {
              displayMatrix: [[1]],
              zeroPaddedMatrix: [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
            };

            gameOfLifeController.toggleTileValue(0, 0);

            expect(gameOfLifeController.gameData.displayMatrix[0][0]).to.deep.equal(0);
            expect(gameOfLifeController.gameData.zeroPaddedMatrix[1][1]).to.deep.equal(0);

          });

          it('should change the value of element in display and zero padded matrix to one if it is zero', function () {

            gameOfLifeController.gameData = {
              displayMatrix: [[0]],
              zeroPaddedMatrix: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
            };

            gameOfLifeController.toggleTileValue(0, 0);

            expect(gameOfLifeController.gameData.displayMatrix[0][0]).to.deep.equal(1);
            expect(gameOfLifeController.gameData.zeroPaddedMatrix[1][1]).to.deep.equal(1);

          });

          it('should not update the values of gameRunning is true', function () {

            gameOfLifeController.gameData = {
              displayMatrix: [[0]],
              zeroPaddedMatrix: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
            };
            gameOfLifeController.gameRunning = true;

            gameOfLifeController.toggleTileValue(0, 0);

            expect(gameOfLifeController.gameData.displayMatrix[0][0]).to.deep.equal(0);
            expect(gameOfLifeController.gameData.zeroPaddedMatrix[1][1]).to.deep.equal(0);

          });

        });

        describe('generateEmptyGrid()', function () {

          it('should invoke gameOfLifeService.initialize with array of given width and height', function () {

            gameOfLifeController.gridHeight = 5;
            gameOfLifeController.gridWidth = 5;

            gameOfLifeController.generateEmptyGrid();

            sinon.assert.calledWithExactly(initStub, new Array(25).fill(0), 5, 5);

          });

        });

        describe('runSingleTick()', function () {

          it('should invoke gameOfLifeService.updateGameStates once', function () {

            gameOfLifeController.runSingleTick();

            sinon.assert.calledOnce(updateStub);

          });

        });

        describe('runFiveTicks()', function () {

          it('should set gameRunning to true', function () {

            gameOfLifeController.runFiveTicks();

            expect(gameOfLifeController.gameRunning).to.be.true;

          });

          it('should updateGameStates five times with an interval of 500ms', function () {

            gameOfLifeController.runFiveTicks();

            $interval.flush(2500);
            $scope.$apply();

            sinon.assert.callCount(updateStub, 5);

          });

          it('should set gameRunning to false after 2500ms', function () {

            gameOfLifeController.runFiveTicks();

            $interval.flush(2500);
            $scope.$apply();

            expect(gameOfLifeController.gameRunning).to.be.false;

          });

        });

        describe('runContinuous()', function () {

          it('should set gameRunning to true if it is false', function () {

            gameOfLifeController.gameRunning = false;
            gameOfLifeController.runContinuous();

            expect(gameOfLifeController.gameRunning).to.be.true;

          });

          it('should invoke $interval and assign it to gameRunner if gameRunning is false', function () {

            gameOfLifeController.gameRunning = false;
            gameOfLifeController.gameRunner = undefined;
            gameOfLifeController.runContinuous();

            expect(gameOfLifeController.gameRunner).not.to.be.undefined;

          });

          it('should set gameRunning to false if it is true', function () {

            gameOfLifeController.gameRunning = true;
            gameOfLifeController.gameRunner = $interval(function () { }, 100);
            $interval.flush(100);
            gameOfLifeController.runContinuous();

            expect(gameOfLifeController.gameRunning).to.be.false;

          });

          it('should cancel interval and set gameRunner to undefined is gameRunning is true', function () {

            gameOfLifeController.gameRunning = true;
            gameOfLifeController.gameRunner = $interval(function () { }, 100);
            $interval.flush(100);
            gameOfLifeController.runContinuous();

            expect(gameOfLifeController.gameRunner).to.be.undefined;

          });

        });

        describe('loadSelectedPreset()', function () {

          it('should do nothing if selectedPresetIndex is less than zero', function () {

            gameOfLifeController.selectedPresetIndex = -1;

            gameOfLifeController.loadSelectedPreset();

            sinon.assert.callCount(initStub, 0);

          });

          it('should invkoke gameOfLifeService.initialize with data from selected preset if index is valid', function () {

            var mockPreset = {
              name: 'block',
              width: 4,
              height: 4,
              matrix: [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
              ]
            };
            var flattenedMatrix = [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0];
            gameOfLifeController.selectedPresetIndex = 0;
            gameOfLifeController.gameData = {
              presets: [mockPreset]
            };

            gameOfLifeController.loadSelectedPreset();

            sinon.assert.calledWithExactly(initStub, flattenedMatrix, 4, 4);

          });

        });

      });
    });
  });
});  

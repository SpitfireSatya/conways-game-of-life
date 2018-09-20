
/* eslint max-nested-callbacks: ["off", 0] */
describe('app', function () {
  describe('game-of-life', function () {
    describe('services', function () {
      describe('gameOfLifeService', function () {

        var gameOfLifeService, $httpBackend, gameConstants, $log;
        var initialStates = [1, 1, 1, 1];

        beforeEach(angular.mock.module('gameOfLife'));

        beforeEach(inject(function (GameOfLifeService, _$httpBackend_, GameConstants, _$log_) {
          gameOfLifeService = GameOfLifeService;
          $httpBackend = _$httpBackend_;
          gameConstants = GameConstants;
          $log = _$log_;
        }));

        afterEach(function () {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
          gameOfLifeService.model = {};
        });

        describe('initialize()', function () {

          it('should assign the height to service model', function () {

            gameOfLifeService.initialize(initialStates, 2, 2);

            expect(gameOfLifeService.model.gridHeight).to.equal(2);

          });

          it('should assign the width to service model', function () {

            gameOfLifeService.initialize(initialStates, 2, 2);

            expect(gameOfLifeService.model.gridWidth).to.equal(2);

          });

          it('should generate a matrix from input states and assign it to service model', function () {

            gameOfLifeService.initialize(initialStates, 2, 2);

            expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[1, 1], [1, 1]]);

          });

          it('should generate a zero padded matrix and assign it to service model', function () {

            gameOfLifeService.initialize(initialStates, 2, 2);

            expect(gameOfLifeService.model.zeroPaddedMatrix).to.deep
              .equal([[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]);

          });

          it('should pad necessary number of zeros to input if length is smaller than expected', function () {

            gameOfLifeService.initialize(initialStates, 3, 3);

            expect(gameOfLifeService.model.displayMatrix).to.deep
              .equal([[1, 1, 1], [1, 0, 0], [0, 0, 0]]);

          });

        });

        describe('updateGameStates()', function () {

          describe('tests for game rules:', function () {

            beforeEach(function () {
              gameOfLifeService.model.gridHeight = 1;
              gameOfLifeService.model.gridWidth = 1;
            });

            afterEach(function () {
              gameOfLifeService.model = {};
            });

            describe('When element is alive:', function () {

              it('it should stay alive when there are 2 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[0, 0, 0], [1, 1, 1], [0, 0, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[1]]);

              });

              it('it should stay alive when there are 3 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[0, 1, 0], [1, 1, 1], [0, 0, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[1]]);

              });

              it('it should die if there is no neighbor alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should die if there is 1 neighbor alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[0, 0, 0], [1, 1, 0], [0, 0, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should die if there are 4 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[0, 1, 0], [1, 1, 1], [0, 1, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should die if there are 5 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[1, 1, 0], [1, 1, 1], [0, 1, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should die if there are 6 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[1, 1, 1], [1, 1, 1], [0, 1, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should die if there are 7 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[1, 1, 1], [1, 1, 1], [1, 1, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should die if there are 8 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

            });

            describe('When element is dead:', function () {

              it('it should become alive if there are 3 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[0, 1, 0], [1, 0, 1], [0, 0, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[1]]);

              });

              it('it should stay dead if there are no neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should stay dead if there is 1 neighbor alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[0, 0, 0], [1, 0, 0], [0, 0, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should stay dead if there are 2 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[0, 0, 0], [1, 0, 1], [0, 0, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should stay dead if there are 4 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[0, 1, 0], [1, 0, 1], [0, 1, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should stay dead if there are 5 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[1, 1, 0], [1, 0, 1], [0, 1, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should stay dead if there are 6 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[1, 1, 1], [1, 0, 1], [0, 1, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should stay dead if there are 7 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[1, 1, 1], [1, 0, 1], [1, 1, 0]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

              it('it should stay dead if there are 8 neighbors alive', function () {

                gameOfLifeService.model.zeroPaddedMatrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];

                gameOfLifeService.updateGameStates();

                expect(gameOfLifeService.model.displayMatrix).to.deep.equal([[0]]);

              });

            });

          });

          it('should iterate over all elements and apply the rules', function () {

            gameOfLifeService.model.gridHeight = 3;
            gameOfLifeService.model.gridWidth = 3;
            gameOfLifeService.model.zeroPaddedMatrix = [
              [0, 0, 0, 0, 0],
              [0, 1, 1, 1, 0],
              [0, 1, 1, 1, 0],
              [0, 1, 1, 1, 0],
              [0, 0, 0, 0, 0]
            ];
            var mockResult = [
              [0, 0, 0, 0, 0],
              [0, 1, 0, 1, 0],
              [0, 0, 0, 0, 0],
              [0, 1, 0, 1, 0],
              [0, 0, 0, 0, 0]
            ];

            gameOfLifeService.updateGameStates();

            expect(gameOfLifeService.model.zeroPaddedMatrix).to.deep.equal(mockResult);

          });

        });

        describe('fetchPresetPatterns()', function () {

          it('should fetch data through an http request and assign it to service model', function () {
            
            $httpBackend.expectGET(gameConstants.urls.PRESET_PATTERN).respond(200, ['mock data']);

            gameOfLifeService.fetchPresetPatterns();
            $httpBackend.flush();

            expect(gameOfLifeService.model.presets).to.deep.equal(['mock data']);

          });

          it('should log the error if request fails', function () {
            
            var logStub = sinon.stub($log, 'log');
            $httpBackend.expectGET(gameConstants.urls.PRESET_PATTERN).respond(500, 'error');

            gameOfLifeService.fetchPresetPatterns();
            $httpBackend.flush();

            sinon.assert.calledWith(logStub, 'Failed to load resource: ');

            logStub.restore();

          });
          
        });

      });
    });
  });
});  


/* eslint max-nested-callbacks: ["off", 0] */
describe('app', function () {
  describe('game-of-life', function () {
    describe('factories', function () {
      describe('gameUtils', function () {

        var gameUtils;
        var mockArray = new Array(9).fill(1);
        var mockMatrix = [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1]
        ];
        var mockZeroPaddedMatrix = [
          [0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [0, 1, 1, 1, 0],
          [0, 1, 1, 1, 0],
          [0, 0, 0, 0, 0]
        ];

        beforeEach(angular.mock.module('gameOfLife'));

        beforeEach(inject(function (GameUtils) {
          gameUtils = GameUtils;
        }));

        describe('generateMatrixFromArray()', function () {

          it('should convert the given array into a 2D matrix of given size', function () {

            var matrix = gameUtils.generateMatrixFromArray(mockArray, 3, 3);

            expect(matrix).to.deep.equal(mockMatrix);

          });

          it('should generate the correct 2D array when width and height are different', function () {

            var testArray = new Array(10).fill(1);
            var expectedResult = [
              [1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1]
            ];

            var matrix = gameUtils.generateMatrixFromArray(testArray, 2, 5);

            expect(matrix).to.deep.equal(expectedResult);

          });

        });

        describe('padZerosAroundMatrix()', function () {

          it('should pad zeros on all sides of the matrix of given height and width', function () {

            var padedMatrix = gameUtils.padZerosAroundMatrix(mockMatrix, 3, 3);

            expect(padedMatrix).to.deep.equal(mockZeroPaddedMatrix);

          });

        });

        describe('removePaddingAroundMatrix', function () {

          it('should remove the padding(outer most elements) from given matrix', function () {

            var matrixWithoutPadding = gameUtils.removePaddingAroundMatrix(mockZeroPaddedMatrix);

            expect(matrixWithoutPadding).to.deep.equal(mockMatrix);

          });

        });

        describe('cropMatrix()', function () {

          it('should crop and return the specified section of a matrix', function () {

            var croppedMatrix = gameUtils.cropMatrix(mockZeroPaddedMatrix, 0, 0, 2, 2);

            expect(croppedMatrix).to.deep.equal([[0, 0], [0, 1]]);

          });

        });

        describe('tile', function () {

          describe('isAlive()', function () {

            it('should return true if input value is 1', function () {

              var returnedValue = gameUtils.tile.isAlive(1);

              expect(returnedValue).to.be.true;

            });

            it('should return false if input value is 0', function () {

              var returnedValue = gameUtils.tile.isAlive(0);

              expect(returnedValue).to.be.false;

            });

          });

          describe('isDead()', function () {

            it('should return true if input value is 0', function () {

              var returnedValue = gameUtils.tile.isDead(0);

              expect(returnedValue).to.be.true;

            });

            it('should return false if input value is 1', function () {

              var returnedValue = gameUtils.tile.isDead(1);

              expect(returnedValue).to.be.false;

            });

          });


        });

      });
    });
  });
});  

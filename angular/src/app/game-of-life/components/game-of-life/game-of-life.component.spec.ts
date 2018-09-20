
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GameOfLifeComponent } from './game-of-life.component';

import { GameOfLifeService } from './../../services/game-of-life.service';
import { GameUtilsService } from './../../services/game-utils.service';
import { IPresets } from './../../models/game-data.model';

import * as sinon from 'sinon';
import { expect } from 'chai';

describe('game-of-life', () => {
  describe('components', () => {
    describe('GameOfLifeComponent', () => {

      let gameOfLifeComponent: GameOfLifeComponent;
      let fixture: ComponentFixture<GameOfLifeComponent>;
      let gameOfLifeService: GameOfLifeService, gameUtilsService: GameUtilsService;
      let initStub: sinon.SinonStub, updateStub: sinon.SinonStub, fetchPresetStub: sinon.SinonStub;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
          declarations: [GameOfLifeComponent],
          providers: [GameOfLifeService, GameUtilsService]
        })
          .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(GameOfLifeComponent);
        gameOfLifeComponent = fixture.componentInstance;
        fixture.detectChanges();
      });

      beforeEach(
        inject([GameOfLifeService, GameUtilsService],
          (_gameOfLifeService_: GameOfLifeService, _gameUtilsService_: GameUtilsService) => {

            gameOfLifeService = _gameOfLifeService_;
            gameUtilsService = _gameUtilsService_;

            initStub = sinon.stub(gameOfLifeService, 'initialize');
            updateStub = sinon.stub(gameOfLifeService, 'updateGameStates');
            fetchPresetStub = sinon.stub(gameOfLifeService, 'fetchPresetPatterns');
          })
      );

      afterEach(() => {
        initStub.restore();
        updateStub.restore();
        fetchPresetStub.restore();
      });

      describe('initialization: ngOnInit()', () => {

        it('should initialize grid height to 5', () => {

          expect(gameOfLifeComponent.gridHeight).to.equal(5);

        });

        it('should initialize grid width to 5', () => {

          expect(gameOfLifeComponent.gridWidth).to.equal(5);

        });

        it('should initialize gameRunning to false', () => {

          expect(gameOfLifeComponent.gameRunning).to.equal(false);

        });

        it('should initialize gameRunner to undefined', () => {

          expect(gameOfLifeComponent.gameRunner).to.equal(undefined);

        });

        it('should initialize selectedPresetIndex to "-1"', () => {

          expect(gameOfLifeComponent.selectedPresetIndex).to.equal('-1');

        });

        it('should invoke gameOfLifeService.initialize with an empty grid of 5x5', () => {

          gameOfLifeComponent.ngOnInit();

          sinon.assert.calledWithExactly(initStub, new Array(25).fill(0), 5, 5);

        });

        it('should invoke gameOfLifeService.fetchPresetPatterns', () => {

          gameOfLifeComponent.ngOnInit();

          sinon.assert.calledOnce(fetchPresetStub);

        });

      });

      describe('toggleTileValue()', () => {

        it('should change the value of element in display and zero padded matrix to zero if it is one', () => {

          (<any>gameOfLifeComponent.gameData) = {
            displayMatrix: [[1]],
            zeroPaddedMatrix: [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
          };

          gameOfLifeComponent.toggleTileValue(0, 0);

          expect(gameOfLifeComponent.gameData.displayMatrix[0][0]).to.deep.equal(0);
          expect(gameOfLifeComponent.gameData.zeroPaddedMatrix[1][1]).to.deep.equal(0);

        });

        it('should change the value of element in display and zero padded matrix to one if it is zero', () => {

          (<any>gameOfLifeComponent.gameData) = {
            displayMatrix: [[0]],
            zeroPaddedMatrix: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
          };

          gameOfLifeComponent.toggleTileValue(0, 0);

          expect(gameOfLifeComponent.gameData.displayMatrix[0][0]).to.deep.equal(1);
          expect(gameOfLifeComponent.gameData.zeroPaddedMatrix[1][1]).to.deep.equal(1);

        });

        it('should not update the values of gameRunning is true', () => {

          (<any>gameOfLifeComponent.gameData) = {
            displayMatrix: [[0]],
            zeroPaddedMatrix: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
          };
          gameOfLifeComponent.gameRunning = true;

          gameOfLifeComponent.toggleTileValue(0, 0);

          expect(gameOfLifeComponent.gameData.displayMatrix[0][0]).to.deep.equal(0);
          expect(gameOfLifeComponent.gameData.zeroPaddedMatrix[1][1]).to.deep.equal(0);

        });

      });

      describe('generateEmptyGrid()', () => {

        it('should invoke gameOfLifeService.initialize with array of given width and height', () => {

          gameOfLifeComponent.gridHeight = 5;
          gameOfLifeComponent.gridWidth = 5;

          gameOfLifeComponent.generateEmptyGrid();

          sinon.assert.calledWithExactly(initStub, new Array(25).fill(0), 5, 5);

        });

      });

      describe('runSingleTick()', function () {

        it('should invoke gameOfLifeService.updateGameStates once', () => {

          gameOfLifeComponent.runSingleTick();

          sinon.assert.calledOnce(updateStub);

        });

      });

      /* describe.skip('runFiveTicks()', function () {

        it('should set gameRunning to true', function () {

          gameOfLifeComponent.runFiveTicks();

          expect(gameOfLifeComponent.gameRunning).to.be.true;

        });

        it('should updateGameStates five times with an interval of 500ms', function () {

          gameOfLifeComponent.runFiveTicks();

          $interval.flush(2500);
          $scope.$apply();

          sinon.assert.callCount(updateStub, 5);

        });

        it('should set gameRunning to false after 2500ms', function () {

          gameOfLifeComponent.runFiveTicks();

          $interval.flush(2500);
          $scope.$apply();

          expect(gameOfLifeComponent.gameRunning).to.be.false;

        });

      });

      describe.skip('runContinuous()', function () {

        it('should set gameRunning to true if it is false', function () {

          gameOfLifeComponent.gameRunning = false;
          gameOfLifeComponent.runContinuous();

          expect(gameOfLifeComponent.gameRunning).to.be.true;

        });

        it('should invoke $interval and assign it to gameRunner if gameRunning is false', function () {

          gameOfLifeComponent.gameRunning = false;
          gameOfLifeComponent.gameRunner = undefined;
          gameOfLifeComponent.runContinuous();

          expect(gameOfLifeComponent.gameRunner).not.to.be.undefined;

        });

        it('should set gameRunning to false if it is true', function () {

          gameOfLifeComponent.gameRunning = true;
          gameOfLifeComponent.gameRunner = $interval(function () { }, 100);
          $interval.flush(100);
          gameOfLifeComponent.runContinuous();

          expect(gameOfLifeComponent.gameRunning).to.be.false;

        });

        it('should cancel interval and set gameRunner to undefined is gameRunning is true', function () {

          gameOfLifeComponent.gameRunning = true;
          gameOfLifeComponent.gameRunner = $interval(function () { }, 100);
          $interval.flush(100);
          gameOfLifeComponent.runContinuous();

          expect(gameOfLifeComponent.gameRunner).to.be.undefined;

        });

      }); */

      describe('loadSelectedPreset()', () => {

        it('should do nothing if selectedPresetIndex is less than zero', () => {

          gameOfLifeComponent.selectedPresetIndex = '-1';

          gameOfLifeComponent.loadSelectedPreset();

          sinon.assert.callCount(initStub, 0);

        });

        it('should invkoke gameOfLifeService.initialize with data from selected preset if index is valid', () => {

          const mockPreset: IPresets = {
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
          const flattenedMatrix: Array<number> = [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0];
          gameOfLifeComponent.selectedPresetIndex = '0';
          (<any>gameOfLifeComponent.gameData) = {
            presets: [mockPreset]
          };

          gameOfLifeComponent.loadSelectedPreset();

          sinon.assert.calledWithExactly(initStub, flattenedMatrix, 4, 4);

        });

      });

    });
  });
});


import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { GameUtilsService } from './../../services/game-utils.service';
import { GameOfLifeService } from './../../services/game-of-life.service';

import { GameConstants } from './../../game-of-life.constants';
import { IGameData, IPresets } from './../../models/game-data.model';


@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.css']
})
export class GameOfLifeComponent implements OnInit {

  gridHeight = 5;
  gridWidth = 5;
  gameData: IGameData;
  gameRunning: boolean = false;
  gameRunner: Subscription = undefined;
  selectedPresetIndex: string = '-1';

  constructor(private gameOfLifeService: GameOfLifeService, private gameUtilsService: GameUtilsService) { }

  public trackByFn(index, item: any): number {
    return index;
  }

  public toggleTileValue(row: number, col: number): void {

    const currentTileValue: number = this.gameData.displayMatrix[row][col];

    if (!this.gameRunning) {
      this.gameData.displayMatrix[row][col] =
        this.gameUtilsService.tile.isAlive(currentTileValue) ? GameConstants.tile.dead : GameConstants.tile.alive;
      this.gameData.zeroPaddedMatrix[row + 1][col + 1] =
        this.gameUtilsService.tile.isAlive(currentTileValue) ? GameConstants.tile.dead : GameConstants.tile.alive;
    }

  }

  public generateEmptyGrid(): void {
    const emptyGridPattern: Array<number> = new Array(this.gridHeight * this.gridWidth).fill(GameConstants.tile.dead);
    this.gameOfLifeService.initialize(emptyGridPattern, this.gridHeight, this.gridWidth);
  }

  public runSingleTick(): void {
    this.gameRunning = true;
    this.gameOfLifeService.updateGameStates();
    this.gameRunning = false;
  }

  public runFiveTicks(): void {
    this.gameRunning = true;
    this.gameRunner = this.createFiveStepInterval()
      .subscribe(() => {
        this.gameOfLifeService.updateGameStates();
      }, (err) => {
        console.log('error: ', err);
      }, () => {
        this.gameRunner.unsubscribe();
        this.gameRunner = undefined;
        this.gameRunning = false;
      });
  }

  public runContinuous(): void {
    if (this.gameRunning) {
      this.gameRunning = false;
      this.gameRunner.unsubscribe();
      this.gameRunner = undefined;
    } else {
      this.gameRunning = true;
      this.gameRunner = this.createContinuousInterval()
        .subscribe(() => {
          this.gameOfLifeService.updateGameStates();
        });
    }
  }

  public loadSelectedPreset(): void {
    const index: number = parseInt(this.selectedPresetIndex, 10);
    if (index > -1) {
      const selectedPresetObject: IPresets = this.gameData.presets[index];
      const flattenedMatrix: Array<number> = selectedPresetObject.matrix.reduce((accumulator, nextElement) => {
        return accumulator.concat(nextElement);
      }, []);
      this.gameOfLifeService.initialize(flattenedMatrix, selectedPresetObject.height, selectedPresetObject.width);
    }
  }

  public ngOnInit(): void {
    this.gameData = this.gameOfLifeService.gameData;
    this.generateEmptyGrid();
    this.gameOfLifeService.fetchPresetPatterns();
  }

  private createFiveStepInterval(): Observable<any> {
    return Observable
      .interval(500)
      .timeInterval()
      .take(5)
  }

  private createContinuousInterval(): Observable<any> {
    return Observable
      .interval(500)
      .timeInterval()
  }

}

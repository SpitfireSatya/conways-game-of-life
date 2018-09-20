
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GameUtilsService } from './game-utils.service';

import { GameConstants } from './../game-of-life.constants';
import { IGameData, IPresets } from './../models/game-data.model';


@Injectable()
export class GameOfLifeService {

  public gameData: IGameData = <IGameData>{};

  constructor(private gameUtilsService: GameUtilsService, private http: HttpClient) { }

  public initialize(initialStates: Array<number>, gridHeight: number, gridWidth: number): void {

    if (initialStates.length < gridHeight * gridWidth) {
      const padStartIndex: number = initialStates.length;
      initialStates.length = gridHeight * gridWidth;
      initialStates.fill(0, padStartIndex);
    }
    this.gameData.gridHeight = gridHeight;
    this.gameData.gridWidth = gridWidth;
    this.gameData.displayMatrix = this.gameUtilsService
      .generateMatrixFromArray(initialStates, gridHeight, gridWidth);
    this.gameData.zeroPaddedMatrix = this.gameUtilsService
      .padZerosAroundMatrix(this.gameData.displayMatrix, gridHeight, gridWidth);

  }

  public updateGameStates(): void {

    const zeroPaddedMatrixClone: Array<Array<number>> = this.gameUtilsService.cropMatrix(this.gameData.zeroPaddedMatrix, 0, 0,
      this.gameData.gridHeight + 2, this.gameData.gridWidth + 2);
    for (let i = 1; i < this.gameData.gridHeight + 1; i++) {
      for (let j = 1; j < this.gameData.gridWidth + 1; j++) {
        zeroPaddedMatrixClone[i][j] = this.computeNewState(i, j);
      }
    }
    this.gameData.zeroPaddedMatrix = zeroPaddedMatrixClone;
    this.gameData.displayMatrix = this.gameUtilsService.removePaddingAroundMatrix(this.gameData.zeroPaddedMatrix);

  }

  public fetchPresetPatterns(): void {
    this.http.get(GameConstants.urls.PRESET_PATTERN)
      .subscribe((data: IPresets) => {
        this.gameData.presets = data;
      }, (error) => {
        console.log('Failed to load resource: ', error);
      });
  }


  private matrixAccumulator(inputMatrix: Array<Array<number>>): number {

    let sunOfMatrix: number = 0;
    const flattenedMatrix: Array<number> = inputMatrix.reduce((accumulator: Array<number>, nextElement: Array<number>) => {
      return accumulator.concat(nextElement);
    }, []);

    sunOfMatrix = flattenedMatrix.reduce((accumulator: number, nextElement: number) => {
      return accumulator + nextElement;
    }, 0);

    return sunOfMatrix;

  }

  private computeNewState(row: number, col: number): number {

    const currentTileValue: number = this.gameData.zeroPaddedMatrix[row][col];
    const croppedMatrix: Array<Array<number>> = this.gameUtilsService.cropMatrix(this.gameData.zeroPaddedMatrix, row - 1, col - 1,
      row + 2, col + 2);
    const neighborsAlive: number = this.matrixAccumulator(croppedMatrix) - currentTileValue;
    let newTileValue: number = -1;

    if (this.gameUtilsService.tile.isAlive(currentTileValue) && (neighborsAlive !== 2 && neighborsAlive !== 3)) {
      newTileValue = GameConstants.tile.dead;
    } else if (this.gameUtilsService.tile.isDead(currentTileValue) && neighborsAlive === 3) {
      newTileValue = GameConstants.tile.alive;
    } else {
      newTileValue = currentTileValue;
    }

    return newTileValue;

  }

}

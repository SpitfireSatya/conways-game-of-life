
import { Injectable } from '@angular/core';

import { GameConstants } from './../game-of-life.constants';

@Injectable()
export class GameUtilsService {

  public tile: { isAlive: Function, isDead: Function } = {
    isAlive: (gameTile) => {
      return gameTile === GameConstants.tile.alive;
    },
    isDead: (gameTile) => {
      return gameTile === GameConstants.tile.dead;
    }
  };

  constructor() { }

  public generateMatrixFromArray(inputPattern: Array<number>, height: number, width: number): Array<Array<number>> {

    const generatedMatrix = [];

    for (let i = 0; i < height; i++) {
      generatedMatrix.push(inputPattern.slice(i * width, (i * width) + width));
    }

    return generatedMatrix;

  }

  public padZerosAroundMatrix(inputMatrix: Array<Array<number>>, height: number, width: number): Array<Array<number>> {

    const inputMatrixCopy = inputMatrix.slice().map((row) => {
      return row.slice();
    });
    const zeroPaddedMatrix = [];

    zeroPaddedMatrix.push(new Array(width + 2).fill(0));

    for (let i = 0; i < height; i++) {
      inputMatrixCopy[i].unshift(0);
      inputMatrixCopy[i].push(0);
      zeroPaddedMatrix.push(inputMatrixCopy[i]);
    }

    zeroPaddedMatrix.push(new Array(width + 2).fill(0));

    return zeroPaddedMatrix;

  }

  public removePaddingAroundMatrix(inputMatrix: Array<Array<number>>): Array<Array<number>> {

    return inputMatrix.slice(1, inputMatrix.length - 1).map((row) => {
      return row.slice(1, row.length - 1);
    });

  }

  public cropMatrix(inputMatrix: Array<Array<number>>, firstRow: number,
    firstCol: number, lastRow: number, lastCol: number): Array<Array<number>> {

    return inputMatrix.slice(firstRow, lastRow).map((row) => {
      return row.slice(firstCol, lastCol);
    });

  }

}

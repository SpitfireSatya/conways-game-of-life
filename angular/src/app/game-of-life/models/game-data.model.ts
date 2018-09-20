
export interface IPresets {
  name: string;
  width: number;
  height: number;
  matrix: Array<Array<number>>;
}

export interface IGameData {
  gridHeight: number;
  gridWidth: number;
  displayMatrix: Array<Array<number>>;
  zeroPaddedMatrix: Array<Array<number>>;
  presets: IPresets;
}

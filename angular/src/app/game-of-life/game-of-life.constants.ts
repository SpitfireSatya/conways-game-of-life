
enum Tile {
  dead,
  alive
}

export class GameConstants {

  public static readonly urls: any = {
    PRESET_PATTERN: '/assets/mocks/preset-patterns.json'
  };

  public static readonly tile: typeof Tile = Tile;

}

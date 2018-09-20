
import { browser, element, by } from 'protractor';

export class GameOfLife {

  public loadPage(): void {
    browser.get('http://localhost:49169/');
  }

  public pageTitle(): any {
    return browser.getTitle();
  }

  public getButtons(): any {
    return element.all(by.tagName('button'));
  }

  public getForms(): any {
    return element.all(by.tagName('form'));
  }

  public getList(): any {
    return element.all(by.tagName('li'));
  }

  public getPresetsDiv(): any {
    return element.all(by.css('.gol-presets'));
  }

  public getGameDiv(): any {
    return element.all(by.css('.gol-grid'));
  }

  public getPresetByIndex(index): any {
    return element.all(by.id('gamePreset')).get(index);
  }

  public getButtonById(id): any {
    return element(by.id(id));
  }

  public getAliveTiles(): any {
    return element.all(by.id('gameTile'))
      .filter((elem, index) => {
        return elem.getAttribute('class').then((value) => {
          return (value.indexOf('gol-tile-live') > -1);
        });
      });
  }

  public getDeadTiles(): any {
    return element.all(by.id('gameTile'))
      .filter((elem, index) => {
        return elem.getAttribute('class').then((value) => {
          return (value.indexOf('gol-tile-dead') > -1);
        });
      });
  }

  public getInputById(id): any {
    return element(by.id(id));
  }

  public getOneGameTile(): any {
    return element.all(by.id('gameTile')).get(0);
  }

}

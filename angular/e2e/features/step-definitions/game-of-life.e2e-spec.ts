
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { defineSupportCode } from 'cucumber';
import { GameOfLife } from '../../page-objects/game-of-life.po';
import { browser, element, by } from 'protractor';

chai.use(chaiAsPromised);

const { expect } = chai;

const gameOfLife = new GameOfLife();

defineSupportCode(({ setDefaultTimeout }) => {
  setDefaultTimeout(10 * 1000);
});

// Scenario: Game of Life on load
defineSupportCode(({ Given, Then }) => {

  Given('I go to {string}', (site, callback) => {
    gameOfLife.loadPage();
    callback();
  });

  Then('I should see the title {string}', (title, callback) => {
    expect(gameOfLife.pageTitle()).to.eventually.equal(title).and.notify(callback);
  });

  Then('I should see {int} buttons on the page', (count, callback) => {
    expect(gameOfLife.getButtons().count()).to.eventually.equal(count).and.notify(callback);
  });

  Then('I should see {int} forms on the page', (count, callback) => {
    expect(gameOfLife.getForms().count()).to.eventually.equal(count).and.notify(callback);
  });

  Then('I should see a list of {int} rules', (count, callback) => {
    expect(gameOfLife.getList().count()).to.eventually.equal(count).and.notify(callback);
  });

  Then('I should see a div for preset patterns', (callback) => {
    expect(gameOfLife.getPresetsDiv().count()).to.eventually.equal(1).and.notify(callback);
  });

  Then('I should see a div for game area', (callback) => {
    expect(gameOfLife.getGameDiv().count()).to.eventually.equal(1).and.notify(callback);
  });

});

// Scenario: Game of Life load preset
defineSupportCode(({ When, Then }) => {

  When('I select some preset', () => {
    return gameOfLife.getPresetByIndex(0).element(by.css('input')).click();
  });

  When('click on load preset', () => {
    return gameOfLife.getButtonById('loadPreset').click();
  });

  Then('that preset should get loaded in the play area', (callback) => {
    expect(gameOfLife.getAliveTiles().count()).to.eventually.equal(4);
    expect(gameOfLife.getDeadTiles().count()).to.eventually.equal(12).and.notify(callback);
  });

});

// Scenario: Generate empty grid
defineSupportCode(({ When, Then }) => {

  When('I enter the input height as {int}', (int) => {
    return gameOfLife.getInputById('gridHeight').clear().sendKeys('10');
  });

  When('I enter the input width as {int}', (int) => {
    return gameOfLife.getInputById('gridWidth').clear().sendKeys('10');
  });

  When('I click on button with id {string}', (buttonId) => {
    return gameOfLife.getButtonById(buttonId).click();
  });

  Then('I should get an empty grid of {int} tiles in game area', (count, callback) => {
    expect(gameOfLife.getAliveTiles().count()).to.eventually.equal(0);
    expect(gameOfLife.getDeadTiles().count()).to.eventually.equal(count).and.notify(callback);

  });

});

// Scenario: Click on tile
defineSupportCode(({ When, Then }) => {

  When('I click on a dead tile', () => {
    return gameOfLife.getOneGameTile().click();
  });

  Then('The tile should become alive', (callback) => {
    expect(gameOfLife.getOneGameTile().getAttribute('class')).to.eventually.contain('gol-tile-live')
      .and.notify(callback);
  });

  When('I click on an alive tile', () => {
    return gameOfLife.getOneGameTile().click();
  });

  Then('The tile should become dead', (callback) => {
    expect(gameOfLife.getOneGameTile().getAttribute('class')).to.eventually.contain('gol-tile-dead')
      .and.notify(callback);
  });

});

// Scenario: Single tick execution
defineSupportCode(({ When, Then }) => {

  When('I select the preset with index {int}', (int) => {
    return gameOfLife.getPresetByIndex(1).element(by.css('input')).click();
  });

  When('I click on load preset button', () => {
    return gameOfLife.getButtonById('loadPreset').click();
  });

  When('I click on the button {string} with id singleRun', (string) => {
    return gameOfLife.getButtonById('singleRun').click();
  });

  Then('I shoud see the next state of the game', (callback) => {
    browser.sleep(500);
    expect(gameOfLife.getAliveTiles().count()).to.eventually.equal(6);
    expect(gameOfLife.getDeadTiles().count()).to.eventually.equal(30).and.notify(callback);
  });

});

// Scenario: Five tick execution
defineSupportCode(({ When, Then }) => {

  When('I click on the button {string} with id fiveTickRun', (string) => {
    browser.ignoreSynchronization = true;
    return gameOfLife.getButtonById('fiveTickRun').click();
  });

  Then('The buttons for single run and {int} tick run should be disabled for {int}ms', function (int, int2, callback) {
    expect(gameOfLife.getButtonById('singleRun').getAttribute('disabled')).to.eventually.equal('true');
    expect(gameOfLife.getButtonById('fiveTickRun').getAttribute('disabled')).to.eventually.equal('true')
      .and.notify(callback);
  });

  Then('I should see the state after {int} changes after {int}ms', (int, int2, callback) => {
    browser.sleep(2500);
    expect(gameOfLife.getAliveTiles().count()).to.eventually.equal(8);
    expect(gameOfLife.getDeadTiles().count()).to.eventually.equal(28).and.notify(callback);
  });

  Then('the buttons for single run and {int} tick run should be enabled after {int}ms', (int, int2, callback) => {
    expect(gameOfLife.getButtonById('singleRun').getAttribute('disabled')).to.eventually.equal(null);
    expect(gameOfLife.getButtonById('fiveTickRun').getAttribute('disabled')).to.eventually.equal(null)
      .and.notify(callback);
  });

});

// Scenario: Continuous run
defineSupportCode(({ When, Then }) => {

  When('I click on the button {string} with id continuousRun', (string) => {
    browser.ignoreSynchronization = true;
    return gameOfLife.getButtonById('continuousRun').click();
  });

  Then('The buttons for single run and {int} tick run should be disabled', (int, callback) => {
    expect(gameOfLife.getButtonById('singleRun').getAttribute('disabled')).to.eventually.equal('true');
    expect(gameOfLife.getButtonById('fiveTickRun').getAttribute('disabled')).to.eventually.equal('true')
      .and.notify(callback);
  });

  Then('The State should keep changing every {int}ms', (int) => {
    browser.sleep(2500);
    gameOfLife.getButtonById('continuousRun').click();
    expect(gameOfLife.getAliveTiles().count()).to.eventually.equal(6);
    expect(gameOfLife.getDeadTiles().count()).to.eventually.equal(30);
    return gameOfLife.getButtonById('continuousRun').click();
  });

  When('I click on the button {string} with id continuousRun again', (string) => {
    return gameOfLife.getButtonById('continuousRun').click();
  });

  Then('The buttons for single run and {int} tick run should be enabled', (int, callback) => {
    expect(gameOfLife.getButtonById('singleRun').getAttribute('disabled')).to.eventually.equal(null);
    expect(gameOfLife.getButtonById('fiveTickRun').getAttribute('disabled')).to.eventually.equal(null)
      .and.notify(callback);
  });

  Then('The State should stop changing', (callback) => {
    browser.sleep(550);
    expect(gameOfLife.getAliveTiles().count()).to.eventually.equal(6);
    expect(gameOfLife.getDeadTiles().count()).to.eventually.equal(30).and.notify(callback);
  });

});

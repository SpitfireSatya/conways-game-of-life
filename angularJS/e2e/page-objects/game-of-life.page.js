/* eslint-disable no-undef */

(function () {
  'use strict';

  var gameOfLife = {

    loadPage: function () {
      browser.get('http://localhost:9000/');
    },
    pageTitle: function () {
      return browser.getTitle();
    },
    getButtons: function () {
      return element.all(by.tagName('button'));
    },
    getForms: function () {
      return element.all(by.tagName('form'));
    },
    getList: function () {
      return element.all(by.tagName('li'));
    },
    getPresetsDiv: function () {
      return element.all(by.css('.gol-presets'));
    },
    getGameDiv: function () {
      return element.all(by.css('.gol-grid'));
    },
    getPresetByIndex: function (index) {
      return element(by.repeater('preset in vm.gameData.presets').row(index));
    },
    getButtonById: function (id) {
      return element(by.id(id));
    },
    getAliveTiles: function () {
      return element.all(by.repeater('element in gameRow'))
        .filter(function (elem, index) {
          return elem.getAttribute('class').then(function (value) {
            return (value.indexOf('gol-tile-live') > -1);
          });
        });
    },
    getDeadTiles: function () {
      return element.all(by.repeater('element in gameRow'))
        .filter(function (elem, index) {
          return elem.getAttribute('class').then(function (value) {
            return (value.indexOf('gol-tile-dead') > -1);
          });
        });
    },
    getInputById: function (id) {
      return element(by.id(id));
    },
    getOneGameTile: function () {
      return element(by.repeater('element in gameRow').row(0));
    }

  };

  module.exports = gameOfLife;

})();

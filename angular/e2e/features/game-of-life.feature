
#features/game-of-life/initialization.features
@smoke
Feature: Game of Life

  Scenario: Game of Life on load
    Given I go to "http://localhost:49169/"
    Then I should see the title "AngularJS Puzzles"
    Then I should see 5 buttons on the page
    And I should see 2 forms on the page
    And I should see a list of 4 rules
    And I should see a div for preset patterns
    And I should see a div for game area

  Scenario: Game of Life load preset
    When I select some preset
    And click on load preset
    Then that preset should get loaded in the play area

  Scenario: Generate empty grid
    When I enter the input height as 10
    And I enter the input width as 10
    And I click on button with id "generateEmptyGrid"
    Then I should get an empty grid of 100 tiles in game area

  Scenario: Click on tile
    When I click on a dead tile
    Then The tile should become alive
    When I click on an alive tile
    Then The tile should become dead

  Scenario: Single tick execution
    When I select the preset with index 1
    And I click on load preset button
    And I click on the button "Single Run" with id singleRun
    Then I shoud see the next state of the game

  Scenario: Five tick execution
    When I click on the button "Run 5 ticks" with id fiveTickRun
    Then The buttons for single run and 5 tick run should be disabled for 2500ms
    And I should see the state after 5 changes after 2500ms
    And the buttons for single run and 5 tick run should be enabled after 2500ms

  Scenario: Continuous run
    When I click on the button "Continuous Run" with id continuousRun
    Then The buttons for single run and 5 tick run should be disabled
    And The State should keep changing every 500ms
    When I click on the button "Continuous Run" with id continuousRun again
    Then The buttons for single run and 5 tick run should be enabled
    And The State should stop changing

// Generated from: e2e/features/home.feature
import { test } from "playwright-bdd";

test.describe('Home Page Background Color', () => {

  test.describe('Change background color', () => {

    test('Example #1', async ({ Given, When, Then, And, page }) => { 
      await Given('I am on the home page', null, { page }); 
      await When('I click the "Turquoise" color button'); 
      await Then('the active color text should be "#1abc9c"'); 
      await And('the background color should be "rgb(26, 188, 156)"'); 
    });

    test('Example #2', async ({ Given, When, Then, And, page }) => { 
      await Given('I am on the home page', null, { page }); 
      await When('I click the "Red" color button'); 
      await Then('the active color text should be "#e74c3c"'); 
      await And('the background color should be "rgb(231, 76, 60)"'); 
    });

    test('Example #3', async ({ Given, When, Then, And, page }) => { 
      await Given('I am on the home page', null, { page }); 
      await When('I click the "Yellow" color button'); 
      await Then('the active color text should be "#f1c40f"'); 
      await And('the background color should be "rgb(241, 196, 15)"'); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('e2e/features/home.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I click the \"Turquoise\" color button","stepMatchArguments":[{"group":{"start":12,"value":"\"Turquoise\"","children":[{"start":13,"value":"Turquoise","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the active color text should be \"#1abc9c\"","stepMatchArguments":[{"group":{"start":32,"value":"\"#1abc9c\"","children":[{"start":33,"value":"#1abc9c","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the background color should be \"rgb(26, 188, 156)\"","stepMatchArguments":[{"group":{"start":31,"value":"\"rgb(26, 188, 156)\"","children":[{"start":32,"value":"rgb(26, 188, 156)","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":15,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":16,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I click the \"Red\" color button","stepMatchArguments":[{"group":{"start":12,"value":"\"Red\"","children":[{"start":13,"value":"Red","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the active color text should be \"#e74c3c\"","stepMatchArguments":[{"group":{"start":32,"value":"\"#e74c3c\"","children":[{"start":33,"value":"#e74c3c","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the background color should be \"rgb(231, 76, 60)\"","stepMatchArguments":[{"group":{"start":31,"value":"\"rgb(231, 76, 60)\"","children":[{"start":32,"value":"rgb(231, 76, 60)","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":23,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the home page","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I click the \"Yellow\" color button","stepMatchArguments":[{"group":{"start":12,"value":"\"Yellow\"","children":[{"start":13,"value":"Yellow","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the active color text should be \"#f1c40f\"","stepMatchArguments":[{"group":{"start":32,"value":"\"#f1c40f\"","children":[{"start":33,"value":"#f1c40f","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And the background color should be \"rgb(241, 196, 15)\"","stepMatchArguments":[{"group":{"start":31,"value":"\"rgb(241, 196, 15)\"","children":[{"start":32,"value":"rgb(241, 196, 15)","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end
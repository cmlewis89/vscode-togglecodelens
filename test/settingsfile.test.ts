import * as assert from 'assert';
import * as settings from '../src/SettingsFileLocator';
var os = require("os");

suite("setting file should", () => {
    var settingValue = "editor.codeLens";
    var settingsFile;
    
     suiteSetup(() => {
        settingsFile = new settings.SettingsFile(() => settings.EnvironemtType.Mac);
    });
    
    test("be set as false if no value in user settings", () => {
       var originalSettingsFile = JSON.stringify({});
       var newSettingsFile = settingsFile.SetValue(settingValue, originalSettingsFile);
       var expected = CreateSettingsString({ "editor.codeLens": false});
       assert.equal(newSettingsFile, expected);
    });
    
    test("be set to true if value was false", () => {
       var originalSettingsFile = CreateSettingsString({ "editor.codeLens": false});
       var newSettingsFile = settingsFile.SetValue(settingValue, originalSettingsFile);
       var expected = CreateSettingsString({ "editor.codeLens": true});
       assert.equal(newSettingsFile, expected);
    });

    test("be set to false if value was true", () => {
       var originalSettingsFile = CreateSettingsString({ "editor.codeLens": true});
       var newSettingsFile = settingsFile.SetValue(settingValue, originalSettingsFile);
       var expected = CreateSettingsString({ "editor.codeLens": false});
       assert.equal(newSettingsFile, expected);
    });
});

function CreateSettingsString(json){
    return JSON.stringify(json, null, 4);
}
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
       assert.equal(expected, newSettingsFile);
    });
    
    test("have comments removed", () => {
       var originalSettingsFile = JSON.stringify({});
       originalSettingsFile = "//comments are supported in vscode settings files" + os.EOL + originalSettingsFile;
       
       
       var newSettingsFile = settingsFile.SetValue(settingValue, originalSettingsFile);
       
       var expected = CreateSettingsString({ "editor.codeLens": true});
       assert.equal(expected, newSettingsFile);
    });
});

function CreateSettingsString(json){
    return JSON.stringify(json, null, 4);
}
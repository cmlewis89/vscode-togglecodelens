import * as assert from 'assert';
import * as vscode from 'vscode';
import * as settings from '../src/SettingsFileLocator';

suite("settingsLocator", () => {
    var originalHome : string;
    var originalAppData : string;

    suiteSetup(() => {
        originalHome = process.env.HOME;
        originalAppData = process.env.APPDATA;
    });
    
    suiteTeardown(() => {
        SetHome(originalHome);
        SetAppData(originalAppData);
    });
    
	test("if mac then is mac path", () => {
		var settingslocator = new settings.SettingsFile(() => {return settings.EnvironemtType.Mac;});
        SetHome('/Users/user');
            
        assert.equal(settingslocator.GetPath(), "/Users/user/Library/Application Support/Code/User/settings.json")
	});
    
    test("if windows then is windows path", () => {
		var settingslocator = new settings.SettingsFile(() => {return settings.EnvironemtType.Windows;});
       
        //windows uses the appdata settings not the home
        SetAppData('C:\\Users\\User\\AppData\\Roaming');
        SetHome('');
            
        assert.equal(settingslocator.GetPath(), "C:\\Users\\User\\AppData\\Roaming\\Code\\User\\settings.json")
	});
    
     test("if linux then is linux path", () => {
		var settingslocator = new settings.SettingsFile(() => {return settings.EnvironemtType.Linux;});
        SetHome('/var/local');   
        
        assert.equal(settingslocator.GetPath(), "/var/local/.config/Code/User/settings.json")
	});

});

function SetHome(home){
      Object.defineProperty(process.env, 'HOME', {
            value: home
        });
}

function SetAppData(location){
      Object.defineProperty(process.env, 'APPDATA', {
            value: location
        });
}
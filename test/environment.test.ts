import * as assert from 'assert';
import * as vscode from 'vscode';
import * as settings from '../src/SettingsFileLocator';
import * as env from '../src/environmentdetection';

suite("when platform", () => {
    var originalPlatform : string;

    suiteSetup(() => {
        originalPlatform = process.platform;
       
    });
    
    suiteTeardown(() => {
        SetPlatform(originalPlatform);
    });


    test("is darwin then Enviroment is Mac", () => {
        SetPlatform("darwin");
        assert.equal(settings.EnvironemtType.Mac, env.EnvironmentDetection())
    });

    test("is win32 then environment is windows", () => {
        SetPlatform("win32");
        assert.equal(settings.EnvironemtType.Windows, env.EnvironmentDetection())
    });

    test("is linux then environment is linux", () => {
        SetPlatform("linux");
        assert.equal(settings.EnvironemtType.Linux, env.EnvironmentDetection())
    });
    
    

});

function SetPlatform(platform){
     Object.defineProperty(process, 'platform', {
            value: platform
        });
};
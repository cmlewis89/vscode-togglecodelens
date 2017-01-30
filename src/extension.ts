// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as settings from '../src/SettingsFileLocator';
import * as env from '../src/environmentdetection';
var os = require("os");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "toggle-codelens" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.toggleCodelens', () => {
        // The code you place here will be executed every time your command is executed
        var message = "failed to change";

        var settingsfile = new settings.SettingsFile(env.EnvironmentDetection);

        fs.readFile(settingsfile.GetPath(), 'utf8', function(err, orignialFile) {
            if (err) {
                vscode.window.showInformationMessage('Toggle-CodeLens unable to modify settings file.');
            }

            console.log('before:' + os.EOL + orignialFile);

            var newFile = settingsfile.SetValue("editor.codeLens", orignialFile);

            fs.writeFile(settingsfile.GetPath(), newFile, function(err) {
                if (err) {
                    vscode.window.showInformationMessage('Toggle-CodeLens unable to modify settings file.');
                }
            });

            console.log('after:' + os.EOL + newFile);

            var value = vscode.workspace.getConfiguration();
            
            // Pop status bar with notification of CodeLens status
            if (value.get("editor.codeLens") == false) {
                vscode.window.setStatusBarMessage('Disabled CodeLens', 3000);
            }
            else {
                vscode.window.setStatusBarMessage('Enabled CodeLens', 3000);
            }
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
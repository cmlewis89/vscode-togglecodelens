export enum EnvironemtType {
    Mac,
    Linux,
    Windows
}

// https://code.visualstudio.com/docs/customization/userandworkspace
// http://stackoverflow.com/a/26227660/697126 - get user data 
export class SettingsFile {
    environment: EnvironemtType;
    private CUSTOMSETTINGKEY = "editor.codeLens";

    public constructor(enviromentDectection: () => EnvironemtType) {
        this.environment = enviromentDectection();
    }

    public GetPath(): string {

        switch (this.environment) {
            case EnvironemtType.Linux:
                return process.env.HOME + '/.config/Code/User/settings.json';
            case EnvironemtType.Mac:
                return process.env.HOME + '/Library/Application Support/Code/User/settings.json';
            case EnvironemtType.Windows:
                return process.env.APPDATA + '\\Code\\User\\settings.json'
        }
    }

    public SetValue(settingName: string, jsonString: string) {
        // there is a comment in the settings.json file.  remove it.
        var usersettings = JSON.parse(jsonString.replace(/\/\/.*/, ""));

        if (settingName in usersettings) {
            this.ChangeValue(usersettings, settingName);
        } else {
            // the default setting is true so if not already set then add it.
            usersettings[settingName] = true;
        }

        return JSON.stringify(usersettings, null, 4);
    }

    private ChangeValue(usersettings, settingName) {
        var codeLens = usersettings[settingName];

        if (codeLens) {
            usersettings[this.CUSTOMSETTINGKEY] = usersettings[settingName];
            usersettings[settingName] = false;
        } else {
            if (this.CUSTOMSETTINGKEY in usersettings) {
                usersettings[settingName] = usersettings[this.CUSTOMSETTINGKEY];
            } else {
                // back to default
                delete usersettings[settingName];
            }
            delete usersettings[this.CUSTOMSETTINGKEY];
        }
    }

}
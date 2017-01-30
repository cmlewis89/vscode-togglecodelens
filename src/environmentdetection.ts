import * as settings from '../src/SettingsFileLocator';

export function EnvironmentDetection(){
    if (process.platform === 'win32'){
        return settings.EnvironemtType.Windows;
    }
    
    if (process.platform === 'darwin'){
        return settings.EnvironemtType.Mac;
    }
    
    if (process.platform === 'linux'){
        return settings.EnvironemtType.Linux;
    }
    
    throw new RangeError("Environment was not detected properly.")
}
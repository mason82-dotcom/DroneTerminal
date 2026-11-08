const LOCAL_STORAGE_ITEM_NAME = 'ofh_settings'

type Setting_MapProvider ='sentinel' | 'bing' | 'openstreetmap' | 'bayern'
type Setting_TerrainProvider = 'cesium' | 'ofh-siplinger'

const SETTINGS = {
    'map-provider': 'sentinel' as Setting_MapProvider,
    'terrain-provider': 'cesium' as Setting_TerrainProvider
}

const DEFAULT_SETTINGS = SETTINGS


export function getSetting<N extends keyof typeof SETTINGS>(name: N): (typeof SETTINGS)[N] {
    if(!SETTINGS.hasOwnProperty(name as PropertyKey)){
        throw new Error('invalid setting name: ' + name)
    }

    const storedSettings = loadStoredSettings()

    if(storedSettings.hasOwnProperty(name as PropertyKey)){
        const storedSettingValue = storedSettings[name as string]

        if(typeof storedSettingValue !== typeof SETTINGS[name]){
            console.error('storedSetting has invalid type', name, storedSettingValue)
        }

        return storedSettingValue
    } else {
        return SETTINGS[name]
    }

}

export type SettingType<SettingName extends keyof typeof SETTINGS> = (typeof SETTINGS)[SettingName]
export type SettingName = keyof typeof SETTINGS

export function setSetting<N extends SettingName>(name: N, value: (typeof SETTINGS)[N]) {
    const storedSettings = loadStoredSettings()

    storedSettings[name] = value

    saveStoredSettings(storedSettings)
}

export function resetSetting<N extends SettingName>(name: N) {
    const storedSettings = loadStoredSettings()

    storedSettings[name] = DEFAULT_SETTINGS[name]

    saveStoredSettings(storedSettings)
}

function loadStoredSettings(): Record<string, any>{
    const storedSettingsString = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME)

    if(typeof storedSettingsString !== 'string'){
        return {}
    }

    try {
        const parsed = JSON.parse(storedSettingsString)

        if(parsed instanceof Array){
            console.error('ofh_settings has invalid structure: Array', parsed)
            return {}
        }

        if(parsed instanceof Object === false){
            console.error('ofh_settings has invalid structure:', parsed)
            return {}
        }

        return parsed
    } catch (err){
        console.error('failed to parse ofh_settings', err)
    }

    return {}
}


function saveStoredSettings(settings: Partial<typeof SETTINGS>){
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(settings))
}

export function resetSettings(){
    localStorage.removeItem(LOCAL_STORAGE_ITEM_NAME)
}
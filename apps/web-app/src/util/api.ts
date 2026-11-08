import api from "@/api"

export function getGeoObjectColorSelectOptions(){
    const colors = api.CONSTANTS.GEO_OBJECT_COLORS

    return Object.keys(colors).map(key => ({label: key, value: colors[key as keyof typeof colors]}))
}
//TODO merge with colors.ts!!!
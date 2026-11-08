import {Color} from 'cesium'

const THEME_COLORS = {
    accent: '#2D8CF0',

    /* DJI Colors */
    blue: '#2D8CF0',
    green: '#19BE6B',
    yellow: '#FFBB00',
    red: '#E23C39',
    purple: '#B620E0'
}

export function getColor(name: keyof typeof THEME_COLORS){
    return Color.fromCssColorString(THEME_COLORS[name])
}//TODO merge with api colors!!!!
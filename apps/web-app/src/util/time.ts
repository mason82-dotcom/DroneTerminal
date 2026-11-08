export function minutesToHHMM(minutes: number){
    const val = minutes
    let h = '' + Math.floor(val / 60)
    if(h.length < 2){
        h = '0' + h
    }

    let m = '' + (val % 60)
    if(m.length < 2){
        m = '0' + m
    }

    return h + ':' + m + ':00'
}

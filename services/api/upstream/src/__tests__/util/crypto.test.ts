import * as crypto from './../../util/crypto'

const CORRECT_BATTERY_HORSE_STAPLE= 'CorrectBatteryHorseStaple'

describe('stringByteLength', ()=>{

    it('should return correct byte length for ascii', async()=>{

        const length = crypto.stringByteLength(CORRECT_BATTERY_HORSE_STAPLE)

        expect(length).toEqual(25)
    })

    it('should return correct byte length for utf-8', async()=>{

        const length = crypto.stringByteLength('😀')

        expect(length).toEqual(4)
    })

})


describe('hashString', ()=>{

    it('should return valid crpyto hash', async()=>{

        const res = await crypto.hashString(CORRECT_BATTERY_HORSE_STAPLE)

        expect(res).toMatch(/^[0-9]+\$[0-9]+\$[0-9]+\$[0-9]+\$[A-Za-z0-9\+\/\=]+\=\$[A-Za-z0-9\+\/\=]+\=$/)
    })

})


describe('stringMatchesHash', ()=>{

    it('should return true for correct match', async()=>{

        const hash = await crypto.hashString(CORRECT_BATTERY_HORSE_STAPLE)
        const res = await crypto.stringMatchesHash(CORRECT_BATTERY_HORSE_STAPLE, hash)

        expect(res).toEqual(true)
    })

    it('should return false for wrong match', async()=>{

        const hash = await crypto.hashString(CORRECT_BATTERY_HORSE_STAPLE)
        const res = await crypto.stringMatchesHash('wrong', hash)

        expect(res).toEqual(false)
    })

})

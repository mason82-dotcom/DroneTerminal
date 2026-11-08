
export function makeUUIDFromId(id: number){

    let idString = '' + id

    if(idString.length > 8){
        throw new Error('id exceeds length of 8: ' + id)
    }

    while(idString.length < 8){
        idString = '0' + idString
    }

    return `${idString}-b847-4a0a-8824-54344deedc14`
}


import { randomUUID } from "crypto"

/**
 * @see getRandomUUIDFromId()
 */
export function getIdFromUUID(uuid: string){

    const match = uuid.match(/(\d{8})-[0-9a-f]{4}-42ae-[0-9a-f]{4}-[0-9a-f]{12}/)

    if(!match){
        throw new Error('invalid uuid format: ' + uuid)
    }

    return parseInt(match[1])
}

/**
 * @see getIdFromUUID()
 */
export function getRandomUUIDFromId(id: number){

    const baseUUID = randomUUID()
    const match = baseUUID.match(/([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})/)

    if(!match){
        throw new Error('baseUUID does not match: ' + baseUUID)
    }

    let idString = '' + id

    if(idString.length > 8){
        throw new Error('id exceeds length of 8: ' + id)
    }

    while(idString.length < 8){
        idString = '0' + idString
    }

    return `${idString}-${match[2]}-42ae-${match[4]}-${match[5]}`
}

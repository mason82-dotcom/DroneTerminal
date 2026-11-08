// only for test environment

import { hashString, stringMatchesHash } from "./crypto"


export async function generatePasswordHash(password: string){
    const serverHash = await hashString(password)

    const check = await stringMatchesHash(password, serverHash)

    console.log('hash', password, serverHash, check ? 'passed check' : 'failed check')
}
import * as crypto from 'crypto'

const DEFAULT_CONFIG = {
    saltLength: 32,
    keyLength: 64,
    N: 2**16,
    r: 8,
    p: 1
}


type CryptoHash = string // k$N$r$p$salt$hash k = key length, N = cost, r = byteLength, p = parallelization, salt = base64 encoded salt bytes, hash = base64 encoded hash

type integer = number
type powerOf2 = integer
type base64string = string

type HashingConfig = {
    keyLength: integer
    N: powerOf2
    r: integer
    p: integer
}

interface CryptoHashConfig extends HashingConfig {
    salt: base64string
    hash: base64string
}

/**
 * matches a string against an existing hash
 * @param str any utf-8 or ascii string. Ff you have a maximum string/password length, make sure to first check string/password byte length with stringByteLength()
 * @param cryptoHash a string previously generated via hashString()
 */
export async function stringMatchesHash(str: string, cryptoHash: CryptoHash){
    const cryptoHashConfig = decodeCryptoHash(cryptoHash)

    const hashedString = await hash(str, cryptoHashConfig.salt, cryptoHashConfig)

    return crypto.timingSafeEqual(Buffer.from(hashedString, 'base64'), Buffer.from(cryptoHashConfig.hash, 'base64'))
}

/**
 * hashes a string with scrypt.
 * @param str any utf-8 or ascii string. Ff you have a maximum string/password length, make sure to first check string/password byte length with stringByteLength()
 * @param customSalt provide a custom salt value. Should be generated with getBase64(generateSalt(saltLength))
 * @returns a string that contains all the parameters that where used to create the hash. Can be used as input for stringMatchesHash()
 */
export async function hashString(str: string, customSalt?: string) : Promise<CryptoHash> {
    const config = DEFAULT_CONFIG
    const saltBase64 = customSalt || getBase64(generateSalt(config.saltLength))

    const hashedString = await hash(str, saltBase64, config)

    return encodeCryptoHash({
        keyLength: config.keyLength,
        N: config.N,
        r: config.r,
        p: config.p,
        salt: saltBase64,
        hash: hashedString
    })
}

export function stringByteLength(str: string){
    const strBytes = getBytes(str)
    return strBytes.byteLength
}

/**
 * a base64 encoded random byte squence
 */
export function generateUniqueToken(sizeInBytes: integer){
    return getBase64(generateSalt(sizeInBytes))
}

/**
 * a urlsafe version of generateUniqueToken(). Attention: This will reduce the entropy a bit!
 * @see generateUniqueToken
 */
export function generateUniqueTokenUrlSafe(sizeInBytes: integer){
    const token = getBase64(generateSalt(sizeInBytes))

    return token.replace(/[^a-zA-Z0-9_]/g, '_')
}

const CRYPTO_HASH_PART_DEFINITIONS : {name: string, type: 'integer' | 'powerOf2' | 'base64' }[] = [{
    name: 'keyLength',
    type: 'integer'
}, {
    name: 'N',
    type: 'powerOf2'
}, {
    name: 'r',
    type: 'integer'
}, {
    name: 'p',
    type: 'integer'
}, {
    name: 'salt',
    type: 'base64'
}, {
    name: 'hash',
    type: 'base64'
}]

function decodeCryptoHash(hash: CryptoHash) : CryptoHashConfig {

    const parts = hash.split('$')
    if(parts.length !== CRYPTO_HASH_PART_DEFINITIONS.length){
        throw new Error('invalid hash format')
    }

    const ret = {}

    for(let i = 0; i < CRYPTO_HASH_PART_DEFINITIONS.length; i++){
        const definition = CRYPTO_HASH_PART_DEFINITIONS[i]

        ret[definition.name] = parseCryptoHashPart(definition, parts[i])
    }

    return ret as CryptoHashConfig
}

function encodeCryptoHash(config: CryptoHashConfig) : CryptoHash {

    for(const definition of CRYPTO_HASH_PART_DEFINITIONS){
        parseCryptoHashPart(definition, config[definition.name])
    }

    return CRYPTO_HASH_PART_DEFINITIONS.map(definition => config[definition.name] ).join('$')
}

function parseCryptoHashPart(definition: {name: string, type: 'integer' | 'powerOf2' | 'base64'}, value: any){

    const valueString = '' + value

    switch(definition.type){
        case 'integer': {

            if(!valueString.match(/^[0-9]+$/)){
                throw new Error('invalid hash definition: ' + definition.name)
            }

            const parsed = parseInt(valueString)

            if(isNaN(parsed)){
                throw new Error('invalid hash definition: ' + definition.name)
            }

            return parsed
        }

        case 'powerOf2': {

            if(!valueString.match(/^[0-9]+$/)){
                throw new Error('invalid hash definition: ' + definition.name)
            }

            const parsed = parseInt(valueString)

            if(isNaN(parsed)){
                throw new Error('invalid hash definition: ' + definition.name)
            }

            if(parsed%2 !== 0){
                throw new Error('invalid hash definition: ' + definition.name)
            }

            return parsed

        }

        case 'base64': {
            if(!valueString.match(/^[A-Za-z0-9\+\/\=]+=$/)){
                throw new Error('invalid hash definition: ' + definition.name)
            }

            return valueString
        }

        default: throw new Error('unsupported CRYPTO_HASH_PART_DEFINITIONS type: ' + definition.type)
    }
}

async function hash(str: string, saltBase64: base64string, config: HashingConfig) : Promise<base64string> {

    const strBytes = getBytes(str)
    const saltBytes = getBytesFromBase64(saltBase64)

    const hashBytes = await scryptHash(strBytes, saltBytes, config.keyLength, config.N, config.r, config.p)

    return getBase64(hashBytes)
}

function getBytes(str: string){
    return new TextEncoder().encode(str)
}

function getBytesFromBase64(base64str: base64string){
    return Buffer.from(base64str, 'base64')
}

function getBase64(bytes: Uint8Array) : base64string {
    return Buffer.from(bytes).toString('base64')
}

function scryptHash(stringBytes: Uint8Array, saltBytes: Uint8Array, keyLength: integer, N: powerOf2, r: integer, p: integer){
    return new Promise<Buffer>((resolve, reject)=>{
        crypto.scrypt(stringBytes, saltBytes, keyLength, {N, r, p, maxmem: (128 * N * r * p) * 2}, (err, derivedKey)=>{
            if(err){
                reject(err)
            } else {
                resolve(derivedKey)
            }
        })
    })
}

function generateSalt(sizeInBytes: integer){
    return crypto.randomBytes(sizeInBytes)
}

//prevent DOS attack with huge inputs
const PASSWORD_MAX_BYTE_LENGTH = 72
export function isSafePassword(password: any){
    if(typeof password !== 'string'){
        return false
    }

    if(password.length < 10){
        return false
    }

    const passwordByteLength = getBytes(password).length
    if(passwordByteLength > PASSWORD_MAX_BYTE_LENGTH){
        return false
    }

    //TODO add more rules

    return true
}

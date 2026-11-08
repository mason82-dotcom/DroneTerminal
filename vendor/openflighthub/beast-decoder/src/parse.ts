
// docs see https://wiki.jetvision.de/wiki/Mode-S_Beast:Data_Output_Formats

import * as modeSAdsbParser from 'mode-s-adsb-parser'
import {logError, logWarning} from './util/log'
import {Byte} from './util/typescript'

type BeastBinaryFrame<T extends BeastBinaryFrameFormat> = {
    format: T,
    bytes: Byte[]
}

export type BeastParsedFrameType = BeastParsedFrameType_Mode_AC | BeastParsedFrameType_Mode_S | BeastParsedFrameType_ADSB | BeastParsedFrameType_Debug
type BeastParsedFrameType_Mode_AC = 'MODE_AC'
type BeastParsedFrameType_Mode_S = 'MODE_S'
type BeastParsedFrameType_ADSB = 'ADSB'
type BeastParsedFrameType_Debug = 'DEBUG'

export type BeastParsedFrame<T extends BeastParsedFrameType> = {
    type: T,
    mlatTimestamp: number
    signalLevel: Byte
    dataBytes: Byte[]
}

export function parseBeastSocketData(data: Buffer<ArrayBufferLike>, ignoreInvalid?: boolean){

    const frames = parseBeastLine(data, ignoreInvalid)

    const parsedFrames: BeastParsedFrame<BeastParsedFrameType>[]= []
    for(const frame of frames){
        try {
            parsedFrames.push(parseBeastFrame(frame))
        } catch (err){
            if(ignoreInvalid){
                //ignore
                logWarning('ignoring invalid frame', frame.format, frame.bytes)
            } else {
                throw err
            }
        }
    }
    return parsedFrames
}


const ESCAPE_BYTE = 0x1a

const BEAST_BINARY_FRAME_FORMAT_MODE_AC: BeastBinaryFrameFormat_Mode_AC = 0x31
const BEAST_BINARY_FRAME_FORMAT_MODE_S_SHORT: BeastBinaryFrameFormat_Mode_S = 0x32
const BEAST_BINARY_FRAME_FORMAT_MODE_S_LONG: BeastBinaryFrameFormat_ADSB = 0x33
const BEAST_BINARY_FRAME_FORMAT_DEBUG: BeastBinaryFrameFormat_Debug = 0x34

// just the content, no escape bytes, no frame format bytes
const BEAST_BINARY_FRAME_CONTENT_LENGTHS: Record<BeastBinaryFrameFormat, number>=  {
    0x31: 6 + 1 + 2,
    0x32: 6 + 1 + 7,
    0x33: 6 + 1 + 14,
    0x34: 6 + 1 + 1 //TODO is this correct? documentation is unclear https://wiki.jetvision.de/wiki/Mode-S_Beast:Data_Output_Formats
}

type BeastBinaryFrameFormat = BeastBinaryFrameFormat_Mode_AC | BeastBinaryFrameFormat_Mode_S | BeastBinaryFrameFormat_ADSB | BeastBinaryFrameFormat_Debug
type BeastBinaryFrameFormat_Mode_AC = 0x31
type BeastBinaryFrameFormat_Mode_S = 0x32
type BeastBinaryFrameFormat_ADSB = 0x33
type BeastBinaryFrameFormat_Debug = 0x34

const BEAST_BINARY_FRAME_TYPES: Record<BeastBinaryFrameFormat, BeastParsedFrameType> = {
    '49': 'MODE_AC',
    '50': 'MODE_S',
    '51': 'ADSB',
    '52': 'DEBUG'
}


class FormatError extends Error {
    constructor(message: string){
        super(message)
    }
}

class FormatErrorWithByteIndex extends Error {
    constructor(message: string, byteIndex: number){
        super(message + ' at byte ' + byteIndex)
    }
}


/**
 *
 * @returns messages contained in that line (already unescaped)
 */
export function parseBeastLine(bytes: Buffer<ArrayBufferLike>, ignoreInvalid?: boolean){

    /* for documentation see

        https://wiki.jetvision.de/wiki/Mode-S_Beast:Data_Output_Formats
        https://github.com/denzen84/dump1090/blob/master/sdr_beast.c @ static int copyBinMessageSafe()
    */


    const frames: BeastBinaryFrame<BeastBinaryFrameFormat>[] = [] // TODO is this efficient? shouldnt we use some kind of Buffer?

    if(bytes[0] !== ESCAPE_BYTE){
        if(ignoreInvalid){
            return []
        } else {
            throw new FormatErrorWithByteIndex('first byte is not an escape byte', 0)
        }
    }

    let currentFrameBytes: Byte[] = []
    let currentFrameFormat: BeastBinaryFrameFormat

    for(let byteIndex = 0; byteIndex < bytes.length; byteIndex++){
        const byte = bytes[byteIndex] as Byte

        if(currentFrameBytes.length === 0 && typeof currentFrameFormat !== 'number' && byte !== ESCAPE_BYTE){
            if(ignoreInvalid){
                break
            } else {
                throw new FormatErrorWithByteIndex('first byte of frame is not an escape byte', byteIndex)
            }
        }

        if(byte === ESCAPE_BYTE){
            const nextByteIndex = byteIndex+1
            if(bytes.length <= nextByteIndex){
                if(ignoreInvalid){
                    break
                } else {
                    throw new FormatErrorWithByteIndex('unexpected escape byte at the very end', byteIndex)
                }
            }

            const nextByte = bytes[nextByteIndex] as Byte

            if(nextByte === ESCAPE_BYTE){
                currentFrameBytes.push(nextByte)
            } else if(nextByte === BEAST_BINARY_FRAME_FORMAT_MODE_AC || nextByte === BEAST_BINARY_FRAME_FORMAT_MODE_S_SHORT || nextByte === BEAST_BINARY_FRAME_FORMAT_MODE_S_LONG || nextByte === BEAST_BINARY_FRAME_FORMAT_DEBUG){
                // new message starts

                if(currentFrameBytes.length > 0){
                    makeFrameAndCleanup()
                }

                currentFrameFormat = nextByte
            } else {
                if(ignoreInvalid){
                    currentFrameBytes.push(nextByte)
                } else {
                    throw new FormatErrorWithByteIndex('unexpected escape byte (the following byte ' + (byteIndex+1) + ' does not need escaping)', byteIndex)
                }
            }

            byteIndex += 1 //skip processing of next byte
        } else {
            currentFrameBytes.push(byte)
        }
    }

    if(currentFrameBytes.length > 0){
        makeFrameAndCleanup()
    }

    function makeFrameAndCleanup(){
        if(typeof currentFrameFormat !== 'number'){
            if(ignoreInvalid){
                cleanup()
                return
            } else {
                throw new FormatError('can not make message, currentFrameFormat is undefined')
            }
        }

        const expectedFrameContentLength = BEAST_BINARY_FRAME_CONTENT_LENGTHS[currentFrameFormat]
        if(currentFrameBytes.length !== expectedFrameContentLength){
            if(ignoreInvalid){
                cleanup()
                return
            } else {
                logError(currentFrameBytes, Buffer.from(currentFrameBytes).toString('ascii'))
                throw new FormatError('invalid content byte length for frame type "' + String.fromCharCode(currentFrameFormat) + '": ' + currentFrameBytes.length + ' (expected ' + expectedFrameContentLength + ')')
            }
        }

        let allBytesAreNull = true
        for(const byte of currentFrameBytes){
            if(byte !== 0){
                allBytesAreNull = false
                break
            }
        }

        //skip empty frames
        if(!allBytesAreNull){
            frames.push({
                format: currentFrameFormat,
                bytes: currentFrameBytes
            })
        }

        cleanup()

        function cleanup(){

            currentFrameBytes = []
            currentFrameFormat = undefined
        }
    }

    return frames
}


export function parseBeastFrame(frame: BeastBinaryFrame<BeastBinaryFrameFormat>) : BeastParsedFrame<BeastParsedFrameType> {

    const dataBytes = frame.bytes.slice(7)
    const mlatTimestamp = modeSAdsbParser.util.bits_and_bytes.bitStringToUnsignedIntegerSafeRangeFromBits(modeSAdsbParser.util.bits_and_bytes.bytesToFullBitString(frame.bytes.slice(0, 6)), 6*8, 'mlatTimestamp')
    const signalLevel = frame.bytes[6]

    if(frame.format < 49 || frame.format > 52){
        throw new Error('unexpected frame.format: ' + frame.format)
    }

    return {
        type: BEAST_BINARY_FRAME_TYPES[frame.format],
        mlatTimestamp,
        signalLevel,
        dataBytes
    }
}


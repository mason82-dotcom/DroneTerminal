
/* TODO fix this implementation (not sure if its working)
function decodeMlatTimestamp(bytes: number[]): BeastMlatTimestamp {

    // format: first 18 bits = seconds of day, next 30 bits: nanoseconds

    // see https://github.com/denzen84/dump1090/blob/master/sdr_beast.c @ void MLATtime_beast()


    const bits = bytesToBitString(bytes)

    const secondsOfDayBits = bits.substring(0, 18)
    const nanoSecondsBits = bits.substring(18)

    const gpsSecondsOfDay = bitStringToInteger(secondsOfDayBits)
    const gpsNanoSecondsOfSecond = bitStringToInteger(nanoSecondsBits)

    //TODO remove this debug code
    const messageNow = new Date('2025-01-29T11:42:00.000Z')

    const nowSecondsOfDay = messageNow.getUTCHours() * 60 * 60 + messageNow.getUTCMinutes() * 60 + messageNow.getUTCSeconds()

    return {
        gpsSecondsOfDay,
        gpsNanoSecondsOfSecond
    }
}*/

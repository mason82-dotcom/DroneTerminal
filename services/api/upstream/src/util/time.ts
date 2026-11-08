import dayjs from 'dayjs'

export function getMillisecondsSinceUnix(isoTimestamp: string){
    const d = dayjs(isoTimestamp)

    return d.unix() * 1000 + d.millisecond()
}
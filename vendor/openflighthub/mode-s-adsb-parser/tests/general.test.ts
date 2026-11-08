import { parseADSB, parseModeS } from "../src";
import * as fs from 'fs'

//TODO

test('todo', ()=>{
    expect(true).toStrictEqual(true)
})

// const messages: Buffer<ArrayBufferLike>[] = fs.readFileSync('tests/example_messages_base64.txt', 'utf-8').split('\n').filter(line => line.length > 0).map(line => Buffer.from(line, 'base64'))

// test('parseBeastSocketData throws no error when ignoreInvalid = true', ()=>{
//     for(const message of messages){
//         parseBeastSocketData(message, true)
//     }
// })

// test('decodeOnlyLocationOfBeastFrame throws no error', ()=>{
//     for(const message of messages){
//         const frames = parseBeastSocketData(message, true)

//         for(const frame of frames){
//             decodeOnlyLocationOfBeastFrame(frame)
//         }
//     }
// })


import * as fs from 'fs';
import Connector from './Connector'
import path from 'path';

export default class Logger {

    private unsupportedTopics: string[] = []

    constructor(connector: Connector, directoryForLogFiles: string){

        const p = path.resolve(directoryForLogFiles)
        if(!fs.existsSync(p)){
            fs.mkdirSync(p)
        }

        const now = new Date()
        const logFilesDirectory = path.join(p, now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '_' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds())

        if(!fs.existsSync(logFilesDirectory)){
            fs.mkdirSync(logFilesDirectory)
        }
        console.info('writting connector logs to', logFilesDirectory)

        const writeStreamPackets = fs.createWriteStream(path.join(logFilesDirectory, 'packets.json'), 'utf-8')
        writeStreamPackets.write('[\n')

        connector.addListener('packet', data => {
            writeStreamPackets.write(JSON.stringify({
                connectionId: data.connectionId,
                clientId: data.client.id,
                received_at: new Date().toISOString(),
                packet: {
                    topic: data.packet.topic,
                    payload: data.packet.payload.toString()
                }
            }, null, 4) + '\n,')
        })

        const writeStreamUnsupportedTopics = fs.createWriteStream(path.join(logFilesDirectory, 'unsupportedTopics.log'), 'utf-8')

        connector.addListener('unsupported_topic', topic => {
            if(!this.unsupportedTopics.includes(topic)){
                this.unsupportedTopics.push(topic)
                writeStreamUnsupportedTopics.write(topic + '\n')
            }
        })
    }


}
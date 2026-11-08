import * as fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';

export default class ExpressApiLogger {

    private readonly writeStream: fs.WriteStream

    constructor(directoryForLogFiles: string){

        const p = path.resolve(directoryForLogFiles)
        if(!fs.existsSync(p)){
            fs.mkdirSync(p)
        }

        const now = new Date()
        const logFilesDirectory = path.join(p, now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '_' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds())

        if(!fs.existsSync(logFilesDirectory)){
            fs.mkdirSync(logFilesDirectory)
        }

        this.writeStream = fs.createWriteStream(path.join(logFilesDirectory, 'requests.json'), 'utf-8')

        this.writeStream.write('[\n')
    }

    logRequestMiddlerware(){
        return (req: Request, res: Response, next: NextFunction)=>{

            const that = this
            let isLogged = false

            res.on('close', logIt)

            function logIt(){
                if(!isLogged){
                    isLogged = true

                    const data: Record<string, any> = {
                        ip: req.ip,
                        time: new Date().toLocaleString(),
                        method: req.method,
                        url: req.originalUrl,
                        status: res.statusCode,
                        headers: req.headers,
                        requestBody: req.body
                    }

                    const currentError = res.GM.getCurrentError()
                    if(currentError){
                        data.error = '' + currentError
                    }

                    const sentData = res.GM.getSentData()
                    if(typeof sentData !== 'undefined'){
                        data.responseBody = sentData
                    }

                    that.writeStream.write(JSON.stringify(data, null, 4) + '\n,')
                }
            }

            next()
        }
    }
}
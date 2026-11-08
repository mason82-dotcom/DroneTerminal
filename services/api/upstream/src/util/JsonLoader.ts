import * as fs from 'fs'

export default class JsonLoader {

    static getJson(filePath: string, requiredProperties?: string[]) : {[key: string] : any} {

        let fd
        try {
            fd = fs.openSync(filePath, 'r')

        } catch (err){
            console.error('Missing json file', filePath)
            throw new Error(err)
        }

        const json = fs.readFileSync(fd, {
            encoding: 'utf-8'
        })

        let jsonParsed
        try {
            jsonParsed = JSON.parse(json)
        } catch(err){
            console.error('Failed to parse json file', filePath, err)
            throw new Error(err)
        }

        if(requiredProperties){
            for(let key of requiredProperties){
                if(jsonParsed[key] === undefined){
                    throw new Error('missing property in json ' + filePath + ': ' + key)
                }
            }

            return jsonParsed
        } else {
            return jsonParsed
        }
    }
}

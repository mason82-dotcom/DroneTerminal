import JsonLoader from './JsonLoader'

export default class SecretsLoader {

    private filePath: string

    constructor(filePath: string){
        this.filePath = filePath
    }

    getSecrets<T extends string>(requiredProperties?: T[]){
        try {
            return JsonLoader.getJson(this.filePath, requiredProperties) as Record<T, any>
        } catch (err){
            console.error('Failed to parse secrets file', err)
            process.exit(1)
        }
    }
}

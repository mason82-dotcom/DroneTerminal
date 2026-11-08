import { NextFunction, RequestHandler, Request, Response, Express } from 'express'
import { validate, filterObject, FilterError } from './util/schema'
import { DBType_User, DBType_Connection } from './generated-definitions/db/DBTypes'
import * as pgp from 'pg-promise'
import { JSONSchema4 } from './util/types/JSONSchema'
import { DBType_User_STATES } from './generated-definitions/db/DBTypes'
import { getCore } from './core'

//@ts-ignore
const db = global.db as pgp.IDatabase<any>


export function guardedMiddleware(app: Express) : RequestHandler {

    app.use((req, res, next)=>{ //prevent someone from using the res.send() function with any value instead of guardSendResult() or unguardedSend()

        const origSend = res.send

        //@ts-ignore
        res.send = function (responseBody: any){

            if(responseBody !== undefined && !res.isGuarded){
                const err = new Error('tried to access prohibited res.send() with a responseBody!')
                console.error(err)
                throw err
            }
            res.isGuarded = true

            return origSend.call(this, responseBody)
        }

        const origJson = res.json

        res.json = function(responseBody: object){

            if(responseBody !== undefined && !res.isGuarded){
                const err = new Error('tried to access prohibited res.json() with a responseBody!')
                console.error(err)
                throw err
            }

            res.isGuarded = true

            return origJson.call(this, responseBody)
        }

        next()
    })

    return (req: Request, res: Response, next: NextFunction) => {

        const gm = new GuardedMiddleware(req, res)

        req.GM = gm
        res.GM = gm

        next()
    }
}


export function getUserForLoginToken(token: string) : Promise<false | DBType_User> {
    return new Promise(resolve=>{
        db.one('SELECT * FROM users WHERE login_token = ${login_token};', {
            login_token: token
        }).then(result => {
            resolve(result)
        }).catch(()=>{
            resolve(false)
        })
    })
}

export function getUserForSessionToken(token: string) : Promise<false | DBType_User> {
    return new Promise(resolve=>{
        db.one('SELECT * FROM users WHERE session_token = ${session_token};', {
            session_token: token
        }).then(result => {
            resolve(result)
        }).catch(()=>{
            resolve(false)
        })
    })
}

export function getUserForStreamToken(token: string) : Promise<false | DBType_User> {
    return new Promise(resolve=>{
        db.one('SELECT * FROM users WHERE stream_token = ${stream_token};', {
            stream_token: token
        }).then(result => {
            resolve(result)
        }).catch(()=>{
            resolve(false)
        })
    })
}

export function getConnectionForSessionToken(sessionToken: string) : Promise<false | DBType_Connection> {
    return new Promise(resolve=>{
        db.one('SELECT * FROM connections WHERE session_token = ${sessionToken};', {
            sessionToken
        }).then(result => {
            resolve(result)
        }).catch(()=>{
            resolve(false)
        })
    })
}


export function getConnectionForSecret(secret: string) : Promise<false | DBType_Connection> {
    return new Promise(resolve=>{
        db.one('SELECT * FROM connections WHERE secret = ${secret};', {
            secret
        }).then(result => {
            resolve(result)
        }).catch(()=>{
            resolve(false)
        })
    })
}


export class GuardedMiddleware {

    private readonly req: Request
    private readonly res: Response

    private readonly requestBody: any
    private readonly requestParams: any
    private currentError: any
    private sentData: any

    currentUser: DBType_User | undefined
    currentConnection: DBType_Connection | undefined

    constructor(req: Request, res: Response){
        this.req = req
        this.res = res

        this.requestBody = req.body
    }

    async guardUserIsAuthenticated() : Promise<DBType_User> {
        const cookie = this.req.cookies['user-auth']

        if(!cookie){
            throw GuardError._401_Unauthorized()
        }

        const user = await getUserForSessionToken(cookie)

        if(user === false){ //invalid token
            throw GuardError._401_Unauthorized()
        }

        if(user.state === DBType_User_STATES.locked || user.state === DBType_User_STATES.deleted){
            throw GuardError._401_Unauthorized()
        }

        this.currentUser = user

        return user
    }


    async guardUserIsAdmin() : Promise<DBType_User> {
        const user = await this.guardUserIsAuthenticated()

        if(await getCore().modules.user.userIsAdmin(user) === false){
            throw GuardError._403_Forbidden()
        }

        return user
    }


    async guardUserHasPermissionForTeam(teamId: number){
        const user = await this.getCurrentUser()

        if(await getCore().modules.team.userCanViewTeam(user.id, teamId) === false){
            throw GuardError._403_Forbidden()
        }
    }

    async guardUserHasPermissionForWorkspace(workspaceId: number){
        const user = await this.getCurrentUser()

        if(await getCore().modules.user.userHasPermissionForWorkspace(user.id, workspaceId) === false){
            throw GuardError._403_Forbidden()
        }
    }

    async guardConnectionHasPermissionForWorkspace(workspaceId: number){
        const connection = await this.getCurrentConnection()

        if(connection.workspace_id !== workspaceId){
            throw GuardError._403_Forbidden()
        }
    }

    async getCurrentUser(){
        if(this.currentUser){
            return this.currentUser
        } else {
            return await this.guardUserIsAuthenticated()
        }
    }

    async guardConnectionLinkIsAuthenticated() : Promise<DBType_Connection> {
        const cookie = this.req.cookies['connection-link-auth']

        if(!cookie){
            throw GuardError._401_Unauthorized()
        }

        const connection = await getConnectionForSessionToken(cookie)

        if(connection === false){ //invalid token
            throw GuardError._401_Unauthorized()
        }

        this.currentConnection = connection

        return connection
    }

    async getCurrentConnection(){
        if(this.currentConnection){
            return this.currentConnection
        } else {
            try {
                return await this.guardConnectionLinkIsAuthenticated()
            } catch (err){
                return await this.guardDjiPilot2ApiIsAuthenticated()
            }
        }
    }


    async guardDjiPilot2ApiIsAuthenticated() : Promise<DBType_Connection> {
        const authToken = this.req.headers['x-auth-token'] as string

        if(!authToken){
            throw GuardError._401_Unauthorized()
        }

        const connection = await getConnectionForSecret(authToken)

        if(connection === false){ //invalid token
            throw GuardError._401_Unauthorized()
        }

        this.currentConnection = connection

        return connection
    }


    async guardDjiPilot2ApiWebsocketIsAuthenticated() : Promise<DBType_Connection> {
        let authToken = this.req.query['x-auth-token'] as string

        if(!authToken){
            throw GuardError._401_Unauthorized()
        }

        let connection = await getConnectionForSecret(authToken)


        if(connection === false && authToken.endsWith('/')){// dji pilot 2 app loves to append a slash after the query param ...
            connection = await getConnectionForSecret(authToken.substring(0, authToken.length - 1))
        }

        if(connection === false){ //invalid token
            throw GuardError._401_Unauthorized()
        }

        this.currentConnection = connection

        return connection
    }


    /**
     * if db query yields no result will execute res.status(410).send()
     * @param retrieveDBObject must return a pg promise like db.one()
     * @returns the result of retrieveDBObject()
     */
    async guardDBGone<T>(retrieveDBObject: () => Promise<T>){
        try {
            const result = await retrieveDBObject()

            return result

        } catch (error) {
            if(error instanceof pgp.errors.QueryResultError){
                throw GuardError._410_Gone('Gone')
            } else {
                throw error
            }
        }
    }

    /**
     * tries to convert e.g. "2" into 2, if the schema requires a number
     * applies changes inplace!
     */
    private recursivelyTryToParseObjectAccordingToSchema(context: any, schema: JSONSchema4, path: string){//TODO test this code
        if(schema.type === 'object'){
            if(typeof context !== 'object' || Array.isArray(context) || context == null){
                throw GuardError._400_invalidBody(path)
            } else {
                for(const key of Object.keys(schema.properties)){

                    if(schema.required instanceof Array && schema.required.includes(key) && context[key] === undefined){
                        throw GuardError._400_invalidBody(path) + '.' + key
                    }

                    if(context[key] !== undefined){
                        context[key] = this.recursivelyTryToParseObjectAccordingToSchema(context[key], schema.properties[key], path + '.' + key)
                    }
                }
            }
        } else if(schema.type === 'array'){

            if(schema.items instanceof Array){
                throw new Error('schema.items -> [] not supported')
            }

            if(context instanceof Array === false){
                throw GuardError._400_invalidBody(path)
            } else {

                for(let i = 0; i < context.length; i++){
                    context[i] = this.recursivelyTryToParseObjectAccordingToSchema(context[i], schema.items, path + '[' + i + ']')
                }
            }
        } else if(schema.type === 'integer'){
            const parsed = parseInt(context)
            if(isNaN(parsed)){
                throw GuardError._400_invalidBody(path)
            }
            return parsed
        } else if(schema.type === 'number'){
            const parsed = parseFloat(context)
            if(isNaN(parsed)){
                throw GuardError._400_invalidBody(path)
            }
            return parsed
        } else if(schema.type === 'boolean'){
            if(context === 'true'){
                return true
            } else if(context === 'false'){
                return false
            } else {
                throw GuardError._400_invalidBody(path)
            }
        }

        return context
    }

    guardBodySchema<T>(schema: JSONSchema4, isMultiFormData?: boolean){

        let body = this.req.body

        if(isMultiFormData){
            body = this.recursivelyTryToParseObjectAccordingToSchema(body, schema, '')
        }

        const valid = validate(body, schema)

        if(valid !== true){
            throw GuardError._400_invalidBody(valid)
        }

        return body as T
    }

    guardParam<T extends 'integer' | 'id' | 'string' | 'uuid'>(paramName: string, schema: T) : T extends 'integer' ? number : ( T extends 'id' ? number : string) {
        const value = this.req.params[paramName]

        switch(schema){
            case 'string': {
                if(typeof value !== 'string'){
                    throw GuardError._400_BadRequest('invalid param ' + paramName)
                }

                //@ts-ignore
                return '' + value
            }

            case 'uuid': {
                if(typeof value !== 'string'){
                    throw GuardError._400_BadRequest('invalid param ' + paramName)
                }

                if(!value.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/)){
                    throw GuardError._400_BadRequest('invalid param ' + paramName)
                }

                //@ts-ignore
                return '' + value
            }

            case 'id':
            case 'integer': {

                if(typeof value !== 'string' || !value.match(/[0-9]+/)){
                    throw GuardError._400_BadRequest('invalid param ' + paramName)
                }

                const parsed = parseInt(value)

                if(isNaN(parsed)){
                    throw GuardError._400_BadRequest('invalid param ' + paramName)
                }

                //@ts-ignore
                return parsed
            }

            default: {
                throw new Error('unsupport param type: ' + schema)
            }
        }
    }


    guardQueryParam<T extends 'integer' | 'id' | 'string' | 'uuid' | 'number'>(paramName: string, schema: T) : T extends 'integer' ? number : ( T extends 'id' ? number : T extends 'number' ? number : string) {
        const value = this.req.query[paramName]

        switch(schema){
            case 'string': {
                if(typeof value !== 'string'){
                    throw GuardError._400_BadRequest('invalid query param ' + paramName)
                }

                //@ts-ignore
                return '' + value
            }

            case 'uuid': {
                if(typeof value !== 'string'){
                    throw GuardError._400_BadRequest('invalid query param ' + paramName)
                }

                if(!value.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/)){
                    throw GuardError._400_BadRequest('invalid query param ' + paramName)
                }

                //@ts-ignore
                return '' + value
            }

            case 'id':
            case 'integer': {

                if(typeof value !== 'string' || !value.match(/[0-9]+/)){
                    throw GuardError._400_BadRequest('invalid query param ' + paramName)
                }

                const parsed = parseInt(value)

                if(isNaN(parsed)){
                    throw GuardError._400_BadRequest('invalid query param ' + paramName)
                }

                //@ts-ignore
                return parsed
            }

            case 'number': {

                if(typeof value !== 'string'){
                    throw GuardError._400_BadRequest('invalid query param ' + paramName)
                }

                const parsed = parseFloat(value)

                if(isNaN(parsed)){
                    throw GuardError._400_BadRequest('invalid query param ' + paramName)
                }

                //@ts-ignore
                return parsed
            }

            default: {
                throw new Error('unsupport query param type: ' + schema)
            }
        }
    }

    guardSend<T extends Record<string, any>>(responseBody: T, schema: JSONSchema4){

        if(responseBody instanceof Promise){
            throw new Error('responseBody is a Promise, did you forget await?')
        }

        try {
            const filtered = filterObject(responseBody, schema)
            this.res.isGuarded = true
            this.setSentData(filtered)
            this.res.send(filtered)
        } catch(err){
            if(err instanceof FilterError){
                console.error('guardSend', this.req.baseUrl + this.req.url, 'responseBody did not satisfy schema:', err, 'responseBody:', responseBody)
                throw err
            } else {
                throw err
            }
        }
    }

    unguardedSend(responseBody: any){
        this.res.isGuarded = true
        this.setSentData(responseBody)
        this.res.send(responseBody)
    }

    setCurrentError(error: any){
        this.currentError = error
    }

    getCurrentError(){
        return this.currentError
    }

    private setSentData(data: any){
        this.sentData = data
    }

    getSentData(){
        return this.sentData
    }
}


export type ParamsSchema = {[key: string] : 'integer' | 'string'}

export class GuardError extends Error {

    readonly statusCode: number
    readonly statusText: string

    constructor(statusCode: number, statusText?: string){
        super('' + statusCode + ': ' + statusText)

        this.statusCode = statusCode
        this.statusText = statusText
    }

    static _make(statusCode: number, message: string, detailedMessage?: string){
        return new GuardError(statusCode, message + (detailedMessage ? ': ' + detailedMessage : ''))
    }

    static _400_BadRequest(detailedMessage?: string){
        return this._make(400, 'Bad Request', detailedMessage)
    }

    static _400_invalidBody(path: string){
        return this._400_BadRequest('Invalid Body Schema: ' + path)
    }

    static _401_Unauthorized(detailedMessage?: string){
        return this._make(401, 'Unauthorized', detailedMessage)
    }

    static _403_Forbidden(detailedMessage?: string){
        return this._make(403, 'Forbidden', detailedMessage)
    }

    static _410_Gone(detailedMessage?: string){
        return this._make(410, 'Gone (Record not found)', detailedMessage)
    }

    static _501_Not_Implemented(detailedMessage?: string){
        return this._make(501, 'Not Implemented', detailedMessage)
    }

}

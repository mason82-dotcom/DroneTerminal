
const IS_TEST_ENVIRONMENT = process.env.JEST_WORKER_ID !== undefined

import express from 'express'

import SecretsLoader from './util/SecretsLoader'
const secretsLoader = new SecretsLoader('secrets.json')
const secrets = secretsLoader.getSecrets([
    'db_host', 'db_port', 'db_database', 'db_user', 'db_password',
    'mail_hostname', 'mail_port', 'mail_secure', 'mail_username', 'mail_password', 'mail_from',
    'emailHashPepper'])

global.emailHashPepper = secrets.emailHashPepper

import {setupMail} from './mail'
setupMail(secrets.mail_hostname, secrets.mail_port, secrets.mail_secure, secrets.mail_username, secrets.mail_password, secrets.mail_from)

import pgp from 'pg-promise'
const db = pgp({
    error: (error)=>{
        if(error.code === 'ECONNREFUSED' || error.routine === 'auth_failed'){
            console.error('DB:', error)
            process.exit(1)
        }
    }
})
({
    host: secrets.db_host,
    port: secrets.db_port,
    database: secrets.db_database,
    user: secrets.db_user,
    password: secrets.db_password,
    max: 10
})

global.db = db

import Core from './core/index'
new Core()

db.connect({
    onLost: ()=>{
        console.warn('lost db connection, restarting')
        process.exit(1)
    }
}).catch(error => {
    console.error(error)
    process.exit(1)
})





import { GuardError } from './ManInTheMiddleware'

const app = express();
export default app //for testing

/*
import {test} from './util/performance/test'
test()
*/

import expressWs from 'express-ws'
const ws = expressWs(app)

import {setupPerformanceMiddleware} from './PerformanceMiddleware'
if(!IS_TEST_ENVIRONMENT){
    setupPerformanceMiddleware(app)
}

//req.body will be an object if content-type header is set to application/json
app.use(express.json({limit: '100mb'}))

app.use(express.static('public'))

app.disable('x-powered-by')


// prevent query parameter pollution
import hpp from 'hpp'
app.use(hpp())

const ALLOWED_ORIGIN_HOSTNAMES = ['http://localhost', 'http://localhost:5173', 'https://openflighthub.org', 'https://editor.swagger.io']

/** CORS setting with OPTIONS pre-flight handling */
app.use(function(req, res, next){

    const origin = req.header('origin')

    if(ALLOWED_ORIGIN_HOSTNAMES.includes(origin)){
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE,OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, accept, access-control-allow-origin')
        res.header('Access-Control-Allow-Credentials', 'true')
    }

    if (req.method === 'OPTIONS'){
        res.sendStatus(200)
    } else {
        next()
    }
})

import cookieParser from 'cookie-parser'
app.use(cookieParser())


// guarded middleware before the actual routes are being use() d
import { guardedMiddleware, GuardedMiddleware } from './ManInTheMiddleware'
app.use(guardedMiddleware(app))


import morgan from 'morgan'
if(!IS_TEST_ENVIRONMENT){
    app.use(morgan('combined'))
}


import path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , './public/index.html'))
})

app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname , './public/docs.html'))
})

import authRoute from './routes/auth'
app.use('/auth', authRoute)


import fileRoute from './routes/file'
app.use('/file', fileRoute)

import userRoute from './routes/user'
app.use('/user', userRoute)

import teamRoute from './routes/team'
app.use('/team', teamRoute)

import organisationRoute from './routes/organisation'
app.use('/organisation', organisationRoute)

import adminRoute from './routes/admin'
app.use('/admin', adminRoute)

import workspaceRoute from './routes/workspace'
app.use('/workspace', workspaceRoute)

import connectionRoute from './routes/connection'
app.use('/connection', connectionRoute)

import droneRoute from './routes/drone'
app.use('/drone', droneRoute)

import mediaRoute from './routes/media'
app.use('/media', mediaRoute)

import flightRoute from './routes/flight'
app.use('/flight', flightRoute)

import remoteControllerRoute from './routes/remote-controller'
app.use('/remote-controller', remoteControllerRoute)

import missionRoute from './routes/mission'
app.use('/mission', missionRoute)

import taskRoute from './routes/task'
app.use('/task', taskRoute)

import connectionLinkRoute from './routes/connection-link'
app.use('/connection-link', connectionLinkRoute)

import omeAdmissionRoute from './routes/ome-admission'
app.use('/ome-admission', omeAdmissionRoute)

import infoRoute from './routes/info'
app.use('/info', infoRoute)

//websockets

import liveRoute from './routes/live'
app.use('/live', liveRoute)


// 404 handler at almost the end of the use() chain
app.use((req, res, next)=> {
    res.status(404)
    res.GM.unguardedSend('404 not found: ' + req.url)
})

// error handler at the very end of the use() chain
app.use((err, req: express.Request, res: express.Response, next)=> {
    try {

        if(!res.GM){
            res.GM = new GuardedMiddleware(req, res)
        }

        res.GM.setCurrentError(err)

        if(err instanceof GuardError){// handle ManInTheMiddleware guardedMiddleware errors
            res.status(err.statusCode)
            res.GM.unguardedSend(err.statusText)

            if(('' + err.statusCode).startsWith('5')){
                console.error('Server Error:', err)
            }
        } else {
            console.warn('Unhandled ' + err.name , '@url', req.method, req.baseUrl + req.url, err)
            res.status(500).GM.unguardedSend('Something went wrong')
        }
    } catch (err){
        console.error('unexpected error while handling a routes error:', req.originalUrl, err)
        res.status(500).send()
    }
})

import FakeDrone from './util/FakeDrone'
import FakeTrack from './util/FakeTrack'

const fakeDrone = new FakeDrone(1, 1, new FakeTrack([
    [10.237261866695315,47.55532957106812,716 + 80],
    [10.233138608008911,47.55299306712239,719 + 80],
    [10.235009527342972,47.55430236903586,723 + 80],

    // [10.31123970862481,47.54303902438443,1470],
    // [10.31111796634494,47.54531198554595,1610],
    // [10.31363253702402,47.5465021623194,1580],
    // [10.31682999575252,47.54770309106804,1490],
    // [10.31861243453544,47.54735457272334,1489],
    // [10.31844535319701,47.54608003223191,1510],
    // [10.31523131736515,47.54569312904921,1501],
    // [10.31363964096565,47.54483188962758,1450]
], 5)
)

import FakeMedia from './util/FakeMedia'
new FakeMedia(fakeDrone)

import { DBType_Drone, DBType_Flight } from './generated-definitions/db/DBTypes'

declare global {

    namespace Express {

        export interface Request {
            GM: GuardedMiddleware
            //query: {[key: string] : string} // hpp middleware TODO uncomment this line again and fix the ts error in express
            _drone?: DBType_Drone // for /drone endpoint auth middlewar
            _flight?: DBType_Flight // for /flight endpoint auth middlewar
        }

        /**
         * @property isGuarded internal use only: for ManInTheMiddleware guardedMiddleware()
         */
        export interface Response {
            GM: GuardedMiddleware
            isGuarded?: true
        }
    }
}

export type MulterFile = {
    filename: string,
    originalname: string,
    path: string
}

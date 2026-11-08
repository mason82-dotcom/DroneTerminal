import { NextFunction, RequestHandler, Request, Response, Express } from 'express'
import { validate, filterObject, FilterError } from './util/schema'
import { DBType_User, DBType_Connection } from './generated-definitions/db/DBTypes'
import * as pgp from 'pg-promise'
import { JSONSchema4 } from './util/types/JSONSchema'
import { DBType_User_STATES } from './generated-definitions/db/DBTypes'
import { getCore } from './core'
import { measurePerformance, measurePerformanceMiddleware } from './util/performance'
import { insert_Api_Endpoint_Performance } from './generated-definitions/db/DBHelpers'

//@ts-ignore
const db = global.db as pgp.IDatabase<any>


export function setupPerformanceMiddleware(app: Express){

    app.use((req, res, next)=>{
        //unfortunately, we cant use measurePerformance(next) because of express restrictions
        //TODO express 5.x supports async handlers out of the box, so that should fix the problem?

        //@ts-ignore
        req._performanceStart = {
            time: performance.now(),
            cpu: process.cpuUsage()
        }

        res.addListener('close', ()=>{

            //@ts-ignore
            const _performanceStart: {time: number, cpu: NodeJS.CpuUsage} = req._performanceStart

            const runTime = performance.now() - _performanceStart.time
            const cpuDiff = process.cpuUsage(_performanceStart.cpu)
            const cpuTimeMs = (cpuDiff.user + cpuDiff.system) / 1000
            const idleTimeMs = runTime - cpuTimeMs
            const workTime = runTime - Math.max(0, idleTimeMs)

            logToDB(req, res, runTime, workTime, _performanceStart.time)
        })

        next()

    })
}

/**
 *
 * @param runTime ms
 * @param workTime ms
 * @param startedAt ms
 */
async function logToDB(req: Request, res: Response, runTime: number, workTime: number, startedAt: number) {
    try {

        const originalUrl = req.originalUrl || req.url
        const queryString = originalUrl.includes('?') ? originalUrl.substring(originalUrl.indexOf('?') + 1) : ''
        const contentLengthString = res.get('Content-Length')

        const urlWithIdParams = originalUrl.split('?')[0]
        const endpoint = urlWithIdParams.replace(/\/\d+/g, '/:id')

        //TODO every day, generate a combined report, then delete the old data
        // e.g. SELECT url, count(*) as calls, max(run_time) as max_run_time, max(work_time) max_work_time, avg(run_time) as avg_run_time, avg(work_time) as avg_work_time FROM api_endpoint_performances GROUP BY url;

        await insert_Api_Endpoint_Performance({
            started_at: new Date(startedAt).toISOString(),
            endpoint,
            http_method: req.method.toLowerCase(),
            url_with_id_params: urlWithIdParams,
            query: queryString.length === 0 ? undefined : queryString,
            content_length: typeof contentLengthString === 'string' ? parseInt(contentLengthString) : 0,
            run_time: runTime,
            work_time: workTime,
            status_code: res.statusCode
        })

    }catch (err){
        console.error('Error logging performance data to DB:', err)
    }
}

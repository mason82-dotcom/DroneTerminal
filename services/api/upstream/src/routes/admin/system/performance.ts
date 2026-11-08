import express from 'express';
import asyncHandler from 'express-async-handler'

import os from 'os'
import { ApiType_Admin_System_Performance_Api_Endpoint_Detail, ApiType_Admin_System_Performance_Api_Endpoints, ApiType_Admin_System_Performance_Os } from '../../../generated-definitions/api/ApiTypes';
import { ApiSchema_Admin_System_Performance_Api_Endpoint_Detail, ApiSchema_Admin_System_Performance_Api_Endpoints, ApiSchema_Admin_System_Performance_Os } from '../../../generated-definitions/api/ApiSchemas';

const router = express.Router()

//@ts-ignore
const db = global.db as pgp.IDatabase<any>

router.get('/os', asyncHandler(async (req, res) => {

    const cpuInfo = os.cpus()

    const cpuCountMap = new Map<string, number>()
    for(const cpu of cpuInfo){
        cpuCountMap.set(cpu.model, (cpuCountMap.get(cpu.model) || 0) + 1)
    }

    const osString = [os.type(), os.release(), os.arch(), os.platform(), os.version()].filter(e => typeof e === 'string' && e.length > 0).join(' ')
    const cpuString = [...cpuCountMap.entries()].map(([model, count])=> `${model} x${count}`).join(', ')
    const ramTotal = os.totalmem()
    const ramFree = os.freemem()
    const loadAvg = os.loadavg()
    const upTime = os.uptime() * 1000

    res.GM.guardSend<ApiType_Admin_System_Performance_Os>(
        {
            os: osString,
            cpu: cpuString,
            ram_total: ramTotal,
            ram_free: ramFree,
            load_avg: {
                avg_1: loadAvg[0],
                avg_5: loadAvg[1],
                avg_15: loadAvg[2]
            },
            uptime: upTime
        },

        ApiSchema_Admin_System_Performance_Os
    )
}))


router.get('/api-endpoints', asyncHandler(async (req, res) => {

    const result = await db.many(`
        SELECT
            endpoint,
            http_method,
            total_calls,
            max_run_time,
            max_work_time,
            avg_run_time,
            avg_work_time,
            pop_standard_dev_run_time,
            pop_standard_dev_work_time,
            (CASE WHEN total_calls = 0 THEN 0 WHEN avg_run_time = 0 THEN 0 ELSE pop_standard_dev_run_time / avg_run_time END) AS pop_standard_dev_run_time_fractional,
            (CASE WHEN total_calls = 0 THEN 0 WHEN avg_work_time = 0 THEN 0 ELSE pop_standard_dev_work_time / avg_work_time END) AS pop_standard_dev_work_time_fractional
        FROM (
            SELECT
                endpoint,
                http_method,
                count(*)::integer AS total_calls,
                max(run_time)::double precision AS max_run_time,
                max(work_time)::double precision AS max_work_time,
                avg(run_time)::double precision AS avg_run_time,
                avg(work_time)::double precision AS avg_work_time,
                stddev_pop(run_time)::double precision AS pop_standard_dev_run_time,
                stddev_pop(work_time)::double precision AS pop_standard_dev_work_time
            FROM api_endpoint_performances
            WHERE status_code >= 200 AND status_code < 400
            GROUP BY endpoint, http_method
        ) tmp;`)

    res.GM.guardSend<ApiType_Admin_System_Performance_Api_Endpoints>(
        result,
        ApiSchema_Admin_System_Performance_Api_Endpoints
    )
}))


router.get('/api-endpoint/details', asyncHandler(async (req, res) => {

    const endpoint = req.GM.guardQueryParam('endpoint', 'string')

    const result = await db.many(`
        SELECT
            endpoint,
            url,
            http_method,
            total_calls,
            max_run_time,
            max_work_time,
            avg_run_time,
            avg_work_time,
            pop_standard_dev_run_time,
            pop_standard_dev_work_time,
            (CASE WHEN total_calls = 0 THEN 0 WHEN avg_run_time = 0 THEN 0 ELSE pop_standard_dev_run_time / avg_run_time END) AS pop_standard_dev_run_time_fractional,
            (CASE WHEN total_calls = 0 THEN 0 WHEN avg_work_time = 0 THEN 0 ELSE pop_standard_dev_work_time / avg_work_time END) AS pop_standard_dev_work_time_fractional
        FROM (
            SELECT
                endpoint,
                url_with_id_params AS url,
                http_method,
                count(*)::integer AS total_calls,
                max(run_time)::double precision AS max_run_time,
                max(work_time)::double precision AS max_work_time,
                avg(run_time)::double precision AS avg_run_time,
                avg(work_time)::double precision AS avg_work_time,
                stddev_pop(run_time)::double precision AS pop_standard_dev_run_time,
                stddev_pop(work_time)::double precision AS pop_standard_dev_work_time
            FROM api_endpoint_performances
            WHERE endpoint = \${endpoint} AND status_code >= 200 AND status_code < 400
            GROUP BY endpoint, url_with_id_params, http_method
        ) tmp;`, { endpoint })

    res.GM.guardSend<ApiType_Admin_System_Performance_Api_Endpoint_Detail>(
        result,
        ApiSchema_Admin_System_Performance_Api_Endpoint_Detail
    )
}))

export default router

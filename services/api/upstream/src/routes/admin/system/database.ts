import express from 'express';
import asyncHandler from 'express-async-handler';
import { ApiType_Admin_System_Database_Info } from '../../../generated-definitions/api/ApiTypes';
import { ApiSchema_Admin_System_Database_Info } from '../../../generated-definitions/api/ApiSchemas';

import * as pgp from 'pg-promise'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

const router = express.Router()

router.get('/info', asyncHandler(async (req, res) => {

    const tables = await db.manyOrNone<{name: string, size: string, row_count: string}>(`select
        c.relname as name,
        pg_total_relation_size(quote_ident(c.relname)) as size,
        COALESCE(s.n_live_tup, 0) as row_count
        from pg_class c
        INNER JOIN pg_stat_user_tables s ON c.oid = s.relid ORDER BY c.relname;`)

    const meta = await db.one<{size: string, version: string}>(`SELECT pg_database_size(current_database()) AS size, version() as version`)

    res.GM.guardSend<ApiType_Admin_System_Database_Info>(
        {
            tables: tables.map(table => {
                return {
                    name: table.name,
                    size: parseInt(table.size),
                    row_count: parseInt(table.row_count)
                }
            }),
            database: {
                size: parseInt(meta.size),
                version: meta.version
            }
        },
        ApiSchema_Admin_System_Database_Info
    )
}))

export default router

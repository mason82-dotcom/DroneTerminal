import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiType_Dji_Pilot_2_Api_Media_Sts_Post_Response } from '../../../../generated-definitions/api/ApiTypes';
import { ApiSchema_Dji_Pilot_2_Api_Media_Sts_Post_Response } from '../../../../generated-definitions/api/ApiSchemas';
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

import {createTemporaryCredentialsForFileUpload, getBucketNameForConnectionId} from '../../../../s3-store'
import SecretsLoader from '../../../../util/SecretsLoader'
const secretsLoader = new SecretsLoader('secrets.json')
const secrets = secretsLoader.getSecrets(['minio_api_url', 'minio_host', 'minio_region'])

const router = express.Router()

router.post('/sts', asyncHandler(async (req, res) => {

    const connection = await req.GM.getCurrentConnection()

    // see https://min.io/docs/minio/linux/developers/security-token-service.html

    const credentials = await createTemporaryCredentialsForFileUpload(connection.id)

    res.GM.guardSend<ApiType_Dji_Pilot_2_Api_Media_Sts_Post_Response>({
        code: 0,
        data: {
            bucket: getBucketNameForConnectionId(connection.id),
            endpoint: secrets.minio_host,
            object_key_prefix: '',//TODO check if we can safely remove this prefix (because empty prefix means all photos are uploaded with a leading slash "/")
            provider: 'minio',
            region: secrets.minio_region,
            credentials: {
                access_key_id: credentials.accessKey,
                access_key_secret: credentials.secretKey,
                expire: 3600,
                security_token: credentials.token// TODO looks like when this is missing, dji calls the /sts endpoint quite often (so probably it is a required property?)
            }
        },
        message: 'success'
    }, ApiSchema_Dji_Pilot_2_Api_Media_Sts_Post_Response)

}))


export default router

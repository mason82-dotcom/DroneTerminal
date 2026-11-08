
// see https://min.io/docs/minio/linux/developers/security-token-service.html
// and https://github.com/minio/minio/blob/master/docs/sts/assume-role.md

// and
// and https://min.io/docs/minio/linux/reference/s3-api-compatibility.html

import * as fs from 'fs'
import * as minio from 'minio'
import { fetchUrl } from "../util/http";
import {generateUniqueTokenUrlSafe} from '../util/crypto'

import SecretsLoader from '../util/SecretsLoader'
import { AssumeRoleCommand, STSClient } from '@aws-sdk/client-sts';
const secretsLoader = new SecretsLoader('secrets.json')
const secrets = secretsLoader.getSecrets(['minio_api_url', 'minio_web_url', 'minio_web_access_key_root', 'minio_web_secret_key_root', 'minio_region'])

const minioApiUrlWithTrailingSlash = secrets.minio_api_url + (('' + secrets.minio_api_url).endsWith('/') ? '' : '/' )

const API_BASE_URL = 'http://' + minioApiUrlWithTrailingSlash

const minioClientRoot = new minio.Client({
    endPoint: minioApiUrlWithTrailingSlash.split(':')[0],
    useSSL: false,
    port: parseInt(minioApiUrlWithTrailingSlash.split(':')[1]),
    accessKey: secrets.minio_web_access_key_root,
    secretKey: secrets.minio_web_secret_key_root,
    region: secrets.minio_region
})

const WEB_API_BASE_URL = 'http://' + secrets.minio_web_url + (('' + secrets.minio_web_url).endsWith('/') ? '' : '/') + 'api/v1'


/**
 * creates new bucket and a user that only has access to exactly this bucket. You can call this multiple times, and it will skip the steps that are already complete (So if this function fails, you can simple execute it again later and try again).
 *
 */
export async function createBucket(bucketName: string){

    const authenticatedHeaders = await loginAsRoot()

    const bucketExistsAlready = await minioClientRoot.bucketExists(bucketName)

    if(!bucketExistsAlready){
        // create new bucket

        await fetchUrl({
            url: WEB_API_BASE_URL + '/buckets',
            method: 'post',
            headers: authenticatedHeaders,
            data: {
                name: bucketName,
                versioning: {
                    enabled: false,
                    excludePrefixes: [],
                    excludeFolders: false
                },
                locking: false
            }
        })
    }



    const policyExistsAlready = await policyExists(bucketName, authenticatedHeaders)

    if(!policyExistsAlready){
        // create new policy

        await fetchUrl({
            url: WEB_API_BASE_URL + '/policies',
            method: 'post',
            headers: authenticatedHeaders,
            data: {
                name: bucketName,
                policy: JSON.stringify({
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Effect": "Allow",
                            "Action": "s3:*",
                            "Resource": [
                                "arn:aws:s3:::" + bucketName + "/*",
                                "arn:aws:s3:::" + bucketName
                            ]
                        }
                    ]
                })
            }
        })
    }


    const userExistsAlready = await userExists(bucketName, authenticatedHeaders)

    if(!userExistsAlready){

        // create new user

        await fetchUrl({
            url: WEB_API_BASE_URL + '/users',
            method: 'post',
            headers: authenticatedHeaders,
            data: {
                accessKey: bucketName,
                secretKey: generateUniqueTokenUrlSafe(42),
                groups: [],
                policies: [bucketName]
            }
        })
    }
}


/**
 * creates new bucket and a user that only has access to exactly this bucket. You can call this multiple times, and it will skip the steps that are already complete (So if this function fails, you can simple execute it again later and try again).
 *
 */
export async function deleteBucket(bucketName: string){

    const authenticatedHeaders = await loginAsRoot()

    const userDoesExist = await userExists(bucketName, authenticatedHeaders)

    if(userDoesExist){

        await fetchUrl({
            url: WEB_API_BASE_URL + '/user/' + bucketName,
            method: 'delete',
            headers: authenticatedHeaders
        })
    }

    const bucketDoesExists = await minioClientRoot.bucketExists(bucketName)

    if(bucketDoesExists){
        await minioClientRoot.removeBucket(bucketName)
    }

    const policyDoesExist = await policyExists(bucketName, authenticatedHeaders)

    if(policyDoesExist){

        await fetchUrl({
            url: WEB_API_BASE_URL + '/policy/' + bucketName,
            method: 'delete',
            headers: authenticatedHeaders
        })
    }

}

export function getBucketNameForConnectionId(connectionId: number){
    return 'connection-' + connectionId
}


/**
 * creates new bucket and a user that only has access to exactly this bucket. You can call this multiple times, and it will skip the steps that are already complete (So if this function fails, you can simple execute it again later and try again).
 *
 * @param connectionId
 * @returns bucket name form getBucketNameForConnectionId()
 */
export async function createBucketForConnection(connectionId: number){

    const newBucketName = getBucketNameForConnectionId(connectionId)

    await createBucket(newBucketName)

    return newBucketName
}

const stsClient= new STSClient({
    endpoint: API_BASE_URL,
    region: secrets.minio_region,
    credentials: {
        accessKeyId: secrets.minio_web_access_key_root,
        secretAccessKey: secrets.minio_web_secret_key_root
    }
})

export async function createTemporaryCredentialsForFileUpload(connectionId: number){

    const bucketExists = await minioClientRoot.bucketExists(getBucketNameForConnectionId(connectionId))

    if(!bucketExists){
        throw new Error('bucket does not exist for connectionId: ' + connectionId)
    }

    const authenticatedHeaders = await loginAsRoot()

    const accessKey = generateUniqueTokenUrlSafe(42).substring(0, 20) //minio max is 20 chars
    const secretKey = generateUniqueTokenUrlSafe(42).substring(0, 40) //minio max is 40 chars


    // create service account
    const createServiceAccountResult = await fetchUrl({
        url: WEB_API_BASE_URL + '/user/' + getBucketNameForConnectionId(connectionId) + '/service-account-credentials',
        method: 'post',
        headers: authenticatedHeaders,
        data: {
            policy: "",
            accessKey,
            secretKey,
            description: "",
            comment: "automatically generated by ofh",
            name: "",
            expiry: new Date(Date.now() + 1000 * 60 * 60 /* 1 hour */).toISOString()
        }
    })

    const token = generateUniqueTokenUrlSafe(20)


    const res = await stsClient.send(new AssumeRoleCommand({
        RoleArn: 'ofh',
        RoleSessionName: token
    }))

    const cred = res.Credentials

    // const assumeRoleResult = await fetchUrl({
    //     url: API_BASE_URL + '?Action=AssumeRoleWithCustomToken?Token=' + token + '&Version=2011-06-15&RoleArn=ofh&DurationSeconds=3600&AUTHPARAMS=',
    //     method: 'post',
    //     headers: authenticatedHeaders
    // })

    return {
        accessKey: cred.AccessKeyId,
        secretKey: cred.SecretAccessKey,
        token: cred.SessionToken
    }
}


async function loginAsRoot(){

    const loginResult = await fetchUrl({
        url: WEB_API_BASE_URL + '/login',
        method: 'post',
        data: {
            accessKey: secrets.minio_web_access_key_root,
            secretKey: secrets.minio_web_secret_key_root,
        }
    })

    return {
        'Cookie': loginResult.responseHeaders.get('Set-Cookie').split(';')[0]
    }
}


async function policyExists(policyName: string, authenticatedHeaders: Record<string, string>){

    try {
        await fetchUrl({
            url: WEB_API_BASE_URL + '/policy/' + policyName,
            method: 'get',
            headers: authenticatedHeaders
        })

        return true

    } catch (err) {
        if(err instanceof Object && typeof err.code === 'number'){
            // minio returns a 500 if it does not find the policy LOL, so we can not differentiate between real server errors and policy not found
            return false
        }

        throw err
    }
}


async function userExists(userName: string, authenticatedHeaders: Record<string, string>){

    try {
        await fetchUrl({
            url: WEB_API_BASE_URL + '/user/' + userName,
            method: 'get',
            headers: authenticatedHeaders
        })

        return true

    } catch (err) {
        if(err instanceof Object && typeof err.code === 'number'){
            if(err.code === 404){
                return false
            }
        }

        throw err
    }
}

export async function uploadObject(bucketName: string, objectKey: string, sourceFilePath: string){
    const readBuffer = await fs.promises.readFile(sourceFilePath)
    await minioClientRoot.putObject(bucketName, objectKey, readBuffer)
}

export function downloadObject(bucketName: string, objectKey: string, targetFilePath: string){
    return new Promise<void>((resolve, reject)=>{

        let state: 'running' | 'rejected' | 'resolved' = 'running'

        const writeStream = fs.createWriteStream(targetFilePath)

        writeStream.on('error', err =>{
            if(state === 'running'){
                reject(err)
                state = 'rejected'
            }
        })

        writeStream.on('finish', ()=>{
            state = 'resolved'
            resolve()
        })

        minioClientRoot.getObject(bucketName, objectKey).then(readStream => {

            readStream.pipe(writeStream)

            readStream.on('error', err => {
                if(state !== 'rejected'){
                    state = 'rejected'
                    reject(err)
                }
            })

        }).catch(reject)
    })
}

export async function deleteObject(bucketName: string, objectKey: string){

    await minioClientRoot.removeObject(bucketName, objectKey)
}

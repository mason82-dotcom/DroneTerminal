import fs from 'fs'
import path from 'path'
import { deleteObject, uploadObject, downloadObject, createTemporaryCredentialsForFileUpload, createBucketForConnection, createBucket, deleteBucket, getBucketNameForConnectionId } from '../../s3-store'
import { randomUUID } from 'crypto'

const TEST_BUCKET_NAME = 'test'

describe('createBucket()', ()=>{

    afterAll(async ()=>{
        await deleteBucket(TEST_BUCKET_NAME)
    })

    test('createBucket()', async ()=>{
        await createBucket(TEST_BUCKET_NAME)
    })

})

describe('deleteBucket()', ()=>{

    beforeAll(async ()=>{
        await createBucket(TEST_BUCKET_NAME)
    })

    test('deleteBucket()', async ()=>{
        await deleteBucket(TEST_BUCKET_NAME)
    })

})


describe('createBucketForConnection()', ()=>{

    afterAll(async ()=>{
        await deleteBucket(getBucketNameForConnectionId(2))
    })

    test('createBucketForConnection()', async ()=>{

        await createBucketForConnection(2)

    })
})

describe('sts', ()=>{

    beforeAll(async ()=>{
        await createBucketForConnection(2)
    })

    afterAll(async ()=>{
        await deleteBucket(getBucketNameForConnectionId(2))
    })

    test('createTemporaryCredentialsForFileUpload', async()=>{
        const credentials = await createTemporaryCredentialsForFileUpload(2)

        expect(typeof credentials.accessKey).toStrictEqual('string')
        expect(typeof credentials.accessKey).toStrictEqual('string')
    })
})

describe('object manipulation', ()=>{

    beforeAll(async ()=>{
        await createBucket(TEST_BUCKET_NAME)
    })

    afterAll(async ()=>{
        await deleteBucket(TEST_BUCKET_NAME)
    })

    test('upload and overwrite object', async()=>{

        const inputFile = path.resolve('./public/index.html')

        const fileName = 'test_upload.png'

        await uploadObject(TEST_BUCKET_NAME, fileName, inputFile)
        await uploadObject(TEST_BUCKET_NAME, fileName, inputFile)

    })

    test('upload and delete object', async()=>{

        const inputFile = path.resolve('./public/index.html')

        const fileName = 'test_upload.png'

        await uploadObject(TEST_BUCKET_NAME, fileName, inputFile)
        await deleteObject(TEST_BUCKET_NAME, fileName)

    })

    test('upload and delete object', async()=>{

        const inputFile = path.resolve('./public/index.html')

        const TEST_OBJECT_KEY = 'test-object.png'

        await uploadObject(TEST_BUCKET_NAME, TEST_OBJECT_KEY, inputFile)

        await deleteObject(TEST_BUCKET_NAME, TEST_OBJECT_KEY)

    })

    test('upload, download and delete object', async()=>{

        const inputFile = path.resolve('./public/index.html')

        const TEST_OBJECT_KEY = 'test-object.png'

        await uploadObject(TEST_BUCKET_NAME, TEST_OBJECT_KEY, inputFile)

        const outputFile = path.resolve('./dist', randomUUID() + '.png')

        await downloadObject(TEST_BUCKET_NAME, TEST_OBJECT_KEY, outputFile)

        await deleteObject(TEST_BUCKET_NAME, TEST_OBJECT_KEY)


        const fdInput = fs.openSync(inputFile, 'r')
        const statsInput =  fs.fstatSync(fdInput)

        const fdOutput = fs.openSync(outputFile, 'r')
        const statsOutput =  fs.fstatSync(fdOutput)

        expect(statsInput.size).toStrictEqual(statsOutput.size)

    })
})

import request from "supertest"
import app from './../../app'
import makeJestOpenAPI from './_makeJestOpenAPI'

makeJestOpenAPI()

describe('GET /connection-link/auth/check', ()=>{

    it('should return 401 if no cookie set', async()=>{

        const res = await request(app)
            .get('/connection-link/auth/check')
            .send()

        expect(res.statusCode).toEqual(401)
        expect(res).toSatisfyApiSpec()
    })

    it('should return 401 if wrong cookie value', async()=>{

        const res = await request(app)
            .get('/connection-link/auth/check')
            .set('Cookie', 'connection-link-auth=wrong')
            .send()

        expect(res.statusCode).toEqual(401)
        expect(res).toSatisfyApiSpec()
    })

})


describe('POST /connection-link/auth/login', ()=>{

    it('should return 400 if no data', async()=>{

        const res = await request(app)
            .post('/connection-link/auth/login')
            .send()

        expect(res.statusCode).toEqual(400)
        expect(res).toSatisfyApiSpec()
    })

    it('should return 418 if invalid credentials', async()=>{

        const res = await request(app)
            .post('/connection-link/auth/login')
            .send({
                connection_id: 'invalid',
                secret: 'invalid'
            })

        expect(res.statusCode).toEqual(418)
        expect(res).toSatisfyApiSpec()
    })

    it('should return 200 if valid credentials', async()=>{

        const res = await request(app)
            .post('/connection-link/auth/login')
            .send({
                connection_id: '2',
                secret: 'access'
            })

        expect(res.statusCode).toEqual(200)
        expect(res.get('Set-Cookie')![0]).toMatch(/.*connection-link-auth=.*/)
        expect(res).toSatisfyApiSpec()
    })



    it('/connection-link/auth/check should pass with received cookie', async()=>{

        const res = await request(app)
            .post('/connection-link/auth/login')
            .send({
                connection_id: '2',
                secret: 'access'
            })

        expect(res.statusCode).toEqual(200)
        expect(res.get('Set-Cookie')![0]).toMatch(/.*connection-link-auth=.*/)
        expect(res).toSatisfyApiSpec()

        const res2 = await request(app)
            .get('/connection-link/auth/check')
            .set('Cookie', res.get('Set-Cookie')!)
            .send()

        expect(res2.statusCode).toEqual(200)
        expect(res2).toSatisfyApiSpec()
    })

})

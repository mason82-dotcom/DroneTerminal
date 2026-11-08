import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>


import * as crypto from './../util/crypto'
import { DBType_User, DBType_User_STATES } from '../generated-definitions/db/DBTypes'
import { ApiType_Auth_Login_Post, ApiType_Auth_Login_With_Token_Post, ApiType_Auth_Password_Change_Post, ApiType_Auth_Password_Reset_Post, ApiType_Auth_Password_Set_New_Post, ApiType_Auth_Password_Set_Initial_Post, ApiType_Reference } from './../generated-definitions/api/ApiTypes'
import { ApiSchema_Auth_Login_Post, ApiSchema_Auth_Login_With_Token_Post, ApiSchema_Auth_Password_Change_Post, ApiSchema_Auth_Password_Reset_Post, ApiSchema_Auth_Password_Set_Initial_Post, ApiSchema_Auth_Password_Set_New_Post, ApiSchema_Auth_Stream_Token, ApiSchema_Reference } from '../generated-definitions/api/ApiSchemas';
import { GuardError } from '../ManInTheMiddleware';
import { hashString, isSafePassword, stringMatchesHash } from './../util/crypto';
import { forceLogoutUser } from '../live-websocket/websocket';
import { getCore } from '../core';


const STREAM_TOKEN_BYTE_LENGTH = 21

const router = express.Router()


function delay(callback: ()=>void){
    return new Promise<void>((resolve, reject)=>{
        //TODO make delay match password hashing and user searching

        setTimeout(()=>{
            try {
                callback()
                resolve()
            } catch (err){
                reject(err)
            }
        }, 1000 * 0.5)

    })
}

router.post('/login', asyncHandler(async (req, res) => {

    const requestBody = req.GM.guardBodySchema<ApiType_Auth_Login_Post>(ApiSchema_Auth_Login_Post)

    let user : DBType_User

    try {
        user = await db.one('SELECT * FROM users WHERE email = ${email};', {
            email: requestBody.username,
        })
    } catch {
        console.log('invalid login: user does not exist', requestBody.username)
        //TODO this implementation is bugged and can lead to no response sent back to the client at all
        /*await delay(()=>{//delay request so people can't correlate that with email existance
            res.status(418).send()//should be 410 gone, but we dont want to tell anyone!
        })*/
        res.status(418).send()//should be 410 gone, but we dont want to tell anyone!

        return
    }

    if(!user.password){// prevent login for users without password (e.g. invitation not yet complete)
        console.log('invalid login: user has no password set not exist', requestBody.username)
        //TODO this implementation is bugged and can lead to no response sent back to the client at all
        /*await delay(()=>{
            res.status(418).send()
        })*/
        res.status(418).send()

        return
    }

    console.log('checking login for user:', requestBody.username, '...')
    const passwordMatches = await crypto.stringMatchesHash(requestBody.password, user.password)

    if(!passwordMatches){
        console.log('invalid login: wrong password', requestBody.username)
        res.status(418).send()
    } else {
        console.log('successfull login:', requestBody.username)

        confirmUser(user.id)

        await getCore().modules.user.generateUserSessionCookieAndSet(user.id, res, true)

        try {
            forceLogoutUser(user.id)
        } catch (err){
            //ignore
            console.log('failed to logout live-update sessions for user', user.id, err)
        }

        res.GM.guardSend<ApiType_Reference>(user, ApiSchema_Reference)
    }

}))


router.post('/login-with-token', asyncHandler(async (req, res) => {

    const requestBody = req.GM.guardBodySchema<ApiType_Auth_Login_With_Token_Post>(ApiSchema_Auth_Login_With_Token_Post)

    try {
        const user = await db.one('SELECT * FROM users WHERE login_token = ${token};', {
            token: requestBody.token
        }) as DBType_User

        try {

            confirmUser(user.id)

            await getCore().modules.user.generateUserSessionCookieAndSet(user.id, res, true)

            try {
                forceLogoutUser(user.id)
            } catch (err){
                //ignore
                console.log('failed to logout live-update sessions for user', user.id, err)
            }


            res.GM.guardSend<ApiType_Reference>(user, ApiSchema_Reference)
        } catch (err){
            console.error(err)
            throw err
        }

    } catch {
        res.status(418).send()
    }
}))

//TODO: renew cookie maxAge?
router.get('/check', asyncHandler(async (req, res) => {

    const sessionToken = req.cookies['user-auth']

    const validSessionToken = typeof sessionToken === 'string'
    if(!validSessionToken){
        console.log('invalid session token')
        throw GuardError._401_Unauthorized('invalid session token')
    }

    try {
        const user = await db.one('SELECT * FROM users WHERE session_token = ${sessionToken};', {
            sessionToken
        }) as DBType_User

        console.log('valid session token')

        res.GM.guardSend<ApiType_Reference>(user, ApiSchema_Reference)

        console.log('user', user.id)

    } catch (err) {
        console.log('invalid session token (no user found)', err)
        throw GuardError._401_Unauthorized('invalid session token')
    }

}))


router.post('/password-change', asyncHandler(async (req, res) => {

    const user = await req.GM.guardUserIsAuthenticated()

    const body = req.GM.guardBodySchema<ApiType_Auth_Password_Change_Post>(ApiSchema_Auth_Password_Change_Post)

    if(!isSafePassword(body.current_password)){
        throw GuardError._400_invalidBody('current_password')
    }


    if(!(await stringMatchesHash(body.current_password, user.password))){
        throw GuardError._403_Forbidden('wrong current password')
    }

    if(!isSafePassword(body.new_password)){
        throw GuardError._400_invalidBody('new_password')
    }

    if([0, 1, 2, 3, 4, 5, 6].includes(user.id)){
        throw GuardError._400_BadRequest('Not allowed for this user')
    }

    await getCore().modules.user.updateUser(user.id, {password: await hashString(body.new_password)})

    res.status(200)
    res.send()
}))

router.post('/password-reset', asyncHandler(async (req, res) => {

    const body = req.GM.guardBodySchema<ApiType_Auth_Password_Reset_Post>(ApiSchema_Auth_Password_Reset_Post)

    await getCore().modules.user.resetPasswordForEmail(body.username)

    res.status(200)
    res.send()
}))

router.post('/password-set-initial', asyncHandler(async (req, res) => {

    const user = await req.GM.guardUserIsAuthenticated()

    const body = req.GM.guardBodySchema<ApiType_Auth_Password_Set_Initial_Post>(ApiSchema_Auth_Password_Set_Initial_Post)

    if(typeof user.password === 'string'){
        throw GuardError._403_Forbidden('initial password already set')
    }

    await getCore().modules.user.updateUser(user.id, {password: await hashString(body.new_password)})

    res.status(200)
    res.send()

}))

router.post('/password-set-new', asyncHandler(async (req, res) => {

    const body = req.GM.guardBodySchema<ApiType_Auth_Password_Set_New_Post>(ApiSchema_Auth_Password_Set_New_Post)

    try {
        const user = await db.one('SELECT * FROM users WHERE reset_code = ${resetCode};', {
            resetCode: body.code
        }) as DBType_User

        if(!isSafePassword(body.new_password)){
            throw GuardError._400_invalidBody('new_password')
        }

        await getCore().modules.user.updateUser(user.id, {password: await hashString(body.new_password), reset_code: null})

        res.status(200)
        res.send()

    } catch {
        res.status(418).send()
    }

}))


router.post('/logout', asyncHandler(async (req, res) => {

    const sessionToken = req.cookies['user-auth']

    try {
        const user = await db.one('SELECT * FROM users WHERE session_token = ${sessionToken};', {
            sessionToken
        }) as DBType_User

        try {
            forceLogoutUser(user.id)
        } catch (err){
            //ignore
            console.log('failed to logout live-update sessions for user', user.id, err)
        }

        try {
            await db.none('UPDATE users SET session_token = null WHERE id = ${id};', {
                id: user.id
            })

            //set cookie
            res.cookie('user-auth', 'invalid', {
                //secure: true, TODO enable for production (but does this not kill api client sdk?)
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 42
            })

            res.status(200).send()

        } catch (err){
            console.error('failed to invalidate session cookie', err)
            res.status(500).send()
        }

    } catch {
        res.cookie('user-auth', 'invalid', {
            //secure: true, TODO enable for production (but does this not kill api client sdk?)
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 42
        })

        res.status(200).send()
    }

}))


router.get('/stream-token', asyncHandler(async (req, res) => {

    let user = await req.GM.guardUserIsAuthenticated()

    if(!user.stream_token){

        const urlSafeToken = crypto.generateUniqueTokenUrlSafe(STREAM_TOKEN_BYTE_LENGTH)

        user = await getCore().modules.user.updateUserSafe(user.id, {
            stream_token: urlSafeToken
        })
    }

    res.status(200).GM.guardSend({
        token: user.stream_token
    }, ApiSchema_Auth_Stream_Token)

}))




export default router

async function confirmUser(userId: number){
    try {
        const user = await getCore().modules.user.getUserSafe(userId)

        if(user.state === DBType_User_STATES.live){
            return
        } else if(user.state === DBType_User_STATES.invited){
            await getCore().modules.user.updateUserSafe(userId, {state: DBType_User_STATES.live})
        } else {
            throw new Error('user state is neither invited or confirmed')
        }

    } catch (err){
        console.error('error while confirming user', err)
    }
}

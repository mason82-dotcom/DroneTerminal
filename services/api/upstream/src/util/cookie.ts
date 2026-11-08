import * as express from "express"

export function setSessionCookie(cookieName: string, cookieValue: string, res: express.Response, customMaxAge?: number){
    res.cookie(cookieName, cookieValue, {
        //secure: true, TODO enable for production (but does this not kill api client sdk?)
        httpOnly: true,
        sameSite: 'strict',
        maxAge: typeof customMaxAge === 'number' ? customMaxAge : (1000 * 60 * 60 * 24)
    })
}

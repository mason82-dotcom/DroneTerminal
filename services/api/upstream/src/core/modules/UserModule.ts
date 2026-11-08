import * as express from 'express'
import {DBInsert_User, DBUpdate_User, delete_User, insert_User, select_User, update_User} from '../../generated-definitions/db/DBHelpers'
import Module_Base, { makeFunctionIdSafe, ModuleError_IdNotFound } from '../Module_Base'
import {setSessionCookie} from '../../util/cookie'
import { generateUniqueTokenUrlSafe, hashString } from '../../util/crypto'
import { sendMailFromTemplate } from '../../mail'
import $t from '../../util/i18n'
import * as pgp from 'pg-promise'
import { DBType_User, DBType_User_STATES, DBType_User_StateType, DBType_Workspace_Permission } from '../../generated-definitions/db/DBTypes'
import { ApiType_Id } from '../../generated-definitions/api/ApiTypes'
import { assignObject } from '../../util/typescript'
import { firstCharAsUppercaseRestAsLowercase } from '../../util/string'
import { getCore } from '..'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>


const TOKEN_BYTE_LENGTH = 42


export default class UserModule extends Module_Base<
    {
        id: number
    },

    {
        create_user: {
            eventDataType: DBType_User,
            availableContexts: 'id'
        },
        update_user: {
            eventDataType: DBType_User,
            availableContexts: 'id'
        },
        delete_user: {
            eventDataType: DBType_User,
            availableContexts: 'id'
        }
    }
> {

    constructor(){
        super()
    }


    async createUser(values: {
        name: string
        email: string
        password?: string
        state?: DBType_User_StateType
    }, createdByUserId: number, dontSendEmail?: boolean){

        if(values.password){
            values.password = await hashString(values.password)
        }

        const allValues = assignObject(values, {
            created_by_user_id: createdByUserId,
            email_hash: await hashString(values.email,
                //@ts-ignore
                global.emailHashPepper)
        })

        const user = await insert_User(allValues)

        this.dispatch('create_user', {
            id: user.id
        }, user)

        if(dontSendEmail !== true){
            await this.sendUserCreateEmail(user)
        }

        return user
    }

    /**
     *
     * @returns false if does not exist
     * @see updateUserSafe
     */
    async updateUser(id: number, data: DBUpdate_User){
        const user = await update_User(id, data)

        if(user === false){
            return false
        }

        this.dispatch('update_user', {
            id: user.id
        }, user)

        return user
    }

    /**
     *
     * @see updateUser
     */
    updateUserSafe = makeFunctionIdSafe(this, this.updateUser)

    /**
     *
     * @returns false if does not exist
     * @see deleteUserSafe
     */
    async deleteUser(id: number){
        const user = await delete_User(id)

        if(user === false){
            return false
        }

        this.dispatch('delete_user', {
            id: user.id
        }, user)
    }

    /**
     *
     * @see deleteUser
     */
    deleteUserSafe = makeFunctionIdSafe(this, this.deleteUser)

    /**
     *
     * @returns false if does not exist
     * @see getUserSafe
     */
    async getUser(id: number){
        return await select_User(id)
    }

    /**
     *
     * @see getUser
     */
    getUserSafe = makeFunctionIdSafe(this, this.getUser)



    async createUserFromEmail(email: string, createdByUserId: number, dontSendEmail?: boolean){

        const name = this.deriveUserNameFromEmail(email)

        return this.createUser({
            name,
            email
        }, createdByUserId, dontSendEmail)
    }

    async sendUserCreateEmail(user: DBType_User){

        const loginToken = await this.getOrMakeLoginToken(user.id)


        //TODO localize mails
        await sendMailFromTemplate(await this.getDecryptedUserEmail(user), $t('mail.register.confirm.self.subject'), 'logo_header_text_button', {
            HEADER: $t('mail.register.confirm.self.header'),

            CONTENT: $t('mail.register.confirm.self.content'),

            BUTTON_TEXT: $t('mail.register.confirm.self.button'),
            BUTTON_URL: 'https://hub.openflighthub.org/?token=' + encodeURIComponent(loginToken)
        })
    }

    /**
     * will resend the "welcome to openflighthub" email, if user state is "invited"
     *
     * @returns false if user does not exist
     */
    async resendUserCreateEmail(userId: number){

        const user = await this.getUser(userId)

        if(user === false){
            return false
        }

        if(user.state === DBType_User_STATES.invited){
            await this.sendUserCreateEmail(user)
        }
    }

    async resetPasswordForEmail(email: string){
        const user = await this.getUserForEmail(email)

        if(user === false){
            return false
        } else {//TODO localise mail

            const code = await this.makePasswordResetCode(user.id)

            await sendMailFromTemplate(await this.getDecryptedUserEmail(user), $t('mail.password_reset.subject'), 'logo_header_text_button', {
                HEADER: $t('mail.password_reset.header'),

                CONTENT: $t('mail.password_reset.content'),

                BUTTON_TEXT: $t('mail.password_reset.button'),
                BUTTON_URL: 'https://hub.openflighthub.org/auth/password-set-new?code=' + code
            })

            return true
        }
    }

    private deriveUserNameFromEmail(email: string){
        const namePart = email.split('@')[0]

        const parts = namePart.split('.')

        if(parts.length === 2){
            const firstname = parts[0]
            const lastname = parts[1]

            return firstCharAsUppercaseRestAsLowercase(firstname) + ' ' + firstCharAsUppercaseRestAsLowercase(lastname)
        } else {
            return firstCharAsUppercaseRestAsLowercase(namePart)
        }
    }

    async getUserForEmail(email: string){

        /* TODO enable for production!
        const email_hash =await hashString(email, global.emailHashPepper)

        const user = await db.oneOrNone<DBType_User>('SELECT * FROM users WHERE email_hash = ${email_hash};', {
            email_hash
        })*/

        const user = await db.oneOrNone<DBType_User>('SELECT * FROM users WHERE email = ${email};', {
            email
        })

        if(user){
            return user
        } else {
            return false
        }
    }

    private async getDecryptedUserEmail(user: DBType_User){

        /* TODO implement email encryption */

        return user.email
    }

    /**
     * gets the existing login token or creates one
     * @returns false if user does not exist
     */
    async getOrMakeLoginToken(userId: ApiType_Id){

        const user = await this.getUser(userId)

        if(user === false){
            return false
        }

        if(user.login_token){
            return user.login_token
        } else {
            const updatedUser = await this.updateUser(userId, {
                login_token: generateUniqueTokenUrlSafe(TOKEN_BYTE_LENGTH)
            }) as DBType_User

            return updatedUser.login_token as string
        }

    }


    /**
     * makes a code that can be used to overwrite the password for a user
     * @returns false if user does not exist
     */
    async makePasswordResetCode(userId: ApiType_Id){

        const updatedUser = await this.updateUser(userId, {
            reset_code: generateUniqueTokenUrlSafe(TOKEN_BYTE_LENGTH)
        })

        if(updatedUser === false){
            return false
        }

        return updatedUser.reset_code
    }

    async userHasPermissionForWorkspace(userId: number, workspaceId: number){

        const user = await select_User(userId)

        if(user === false || typeof user.team_id !== 'number'){
            return false
        }

        if(await getCore().modules.user.userIsAdmin(user)){
            return true
        }

        const res = await db.oneOrNone<DBType_Workspace_Permission>('SELECT * FROM workspace_permissions WHERE team_id = ${teamId} AND workspace_id = ${workspaceId}', {
            teamId: user.team_id,
            workspaceId
        })

        return !!res
    }

    async generateUserSessionCookieAndSet(userId: number, res: express.Response, allowReuseExistingSessionToken?: boolean){
        const user = await this.getUserSafe(userId)

        let sessionToken: string
        if(allowReuseExistingSessionToken){
            const currentToken = user.session_token

            if(currentToken){
                sessionToken = currentToken
            } else {
                sessionToken = generateUniqueTokenUrlSafe(TOKEN_BYTE_LENGTH)
            }
        } else {
            sessionToken = generateUniqueTokenUrlSafe(TOKEN_BYTE_LENGTH)
        }

        await this.updateUser(userId, {
            session_token: sessionToken
        })

        setSessionCookie('user-auth', sessionToken, res)
    }

    async userIsAdmin(user: DBType_User | number){
        if(typeof user === 'number'){
            user = await this.getUserSafe(user)
        }

        return user.id === 4
    }


    /**
     *
     * @returns falseif user is already in a different team
     */
    async assignUserToTeam(userId: number, teamId: number, ignoreIfAlreadyInTeam = false){

        const user = await this.getUserSafe(userId)

        if(user.team_id === teamId){
            // user is already in the team, do nothing
            return user
        }

        if(typeof user.team_id !== 'number' || ignoreIfAlreadyInTeam){
            const updatedUser = await update_User(user.id, {
                team_id: teamId
            })

            if(updatedUser === false){
                throw new ModuleError_IdNotFound(user.id)
            }

            this.dispatch('update_user', {
                id: user.id
            }, updatedUser)

            return user
        } else {
            return false
        }
    }

    async removeUserFromTeam(userId: number){

        const user = await this.getUserSafe(userId)

        await update_User(user.id, {
            //@ts-ignore
            team_id: null
        })
    }

}

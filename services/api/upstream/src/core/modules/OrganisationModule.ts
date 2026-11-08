import {DBUpdate_Organisation, delete_Organisation, insert_Organisation, select_Organisation, select_Team, select_User, update_Organisation} from '../../generated-definitions/db/DBHelpers'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'
import * as pgp from 'pg-promise'
import { DBType_Organisation, DBType_Organisation_StateType, DBType_User } from '../../generated-definitions/db/DBTypes'
import { getCore } from '..'
import { deduplicateIdArray } from '../../util/array'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

export default class OrganisationModule extends Module_Base<
    {
        id: number
    },

    {
        create_organisation: {
            eventDataType: DBType_Organisation,
            availableContexts: 'id'
        },
        update_organisation: {
            eventDataType: DBType_Organisation,
            availableContexts: 'id'
        },
        delete_organisation: {
            eventDataType: DBType_Organisation,
            availableContexts: 'id'
        }
    }
> {

    constructor(){
        super()
    }


    async createOrganisation(values: {
        name: string
        owner_user_id: number
        state?: DBType_Organisation_StateType
    }){

        const organisation = await insert_Organisation(values)//TODO do we need to check for user id being correct or does the foreign key constraint kick in?

        this.dispatch('create_organisation', {
            id: organisation.id
        }, organisation)

        return organisation
    }

    /**
     *
     * @returns false if does not exist
     * @see updateOrganisationSafe
     */
    async updateOrganisation(id: number, data: DBUpdate_Organisation){
        const organisation = await update_Organisation(id, data)

        if(organisation === false){
            return false
        }

        this.dispatch('update_organisation', {
            id: organisation.id
        }, organisation)

        return organisation
    }

    /**
     *
     * @see updateOrganisation
     */
    updateOrganisationSafe = makeFunctionIdSafe(this, this.updateOrganisation)

    /**
     *
     * @returns false if does not exist
     * @see deleteOrganisationSafe
     */
    async deleteOrganisation(id: number){
        const organisation = await delete_Organisation(id)

        if(organisation === false){
            return false
        }

        this.dispatch('delete_organisation', {
            id: organisation.id
        }, organisation)
    }

    /**
     *
     * @see deleteOrganisation
     */
    deleteOrganisationSafe = makeFunctionIdSafe(this, this.deleteOrganisation)

    /**
     *
     * @returns false if does not exist
     * @see getOrganisationSafe
     */
    async getOrganisation(id: number){
        return await select_Organisation(id)
    }

    /**
     *
     * @see getOrganisation
     */
    getOrganisationSafe = makeFunctionIdSafe(this, this.getOrganisation)


    async userCanEditOrganisation(userId: number, organisation_id: number) {

        const organisation = await this.getOrganisationSafe(organisation_id)

        if(await getCore().modules.user.userIsAdmin(userId)){
            return true
        }

        if(organisation.owner_user_id = userId){
            return true
        }

        return false
    }

    async userCanViewOrganisation(userId: number, organisationId: number) {
        if(await getCore().modules.user.userIsAdmin(userId)){
            return true
        }

        if((await this.getOrganisationSafe(organisationId)).owner_user_id === userId){
            //owns parent organisation of team
            return true
        }

        const userTeam = await getCore().modules.user.getUserSafe(userId)
        if(typeof userTeam.team_id === 'number' && (await getCore().modules.team.getTeamSafe(userTeam.team_id)).organisation_id === organisationId){
            // user is member of a team that belongs to the organisation
            return true
        }

        return false
    }

    async getOrganisationsUserOwns(user: DBType_User){
        const organisations = await select_Organisation(pgp.as.format('WHERE owner_user_id = ${userId}', {userId: user.id}))

        if(typeof user.team_id === 'number'){
            const directTeam = await getCore().modules.team.getTeamSafe(user.team_id)

            if(typeof directTeam.organisation_id === 'number'){
                organisations.push(await this.getOrganisationSafe(directTeam.organisation_id))
            }
        }

        return deduplicateIdArray(organisations)
    }

    async getOrganisationsUserHasAccessTo(user: DBType_User){
        const organisations = await this.getOrganisationsUserOwns(user)

        if(typeof user.team_id === 'number'){
            const directTeam = await getCore().modules.team.getTeamSafe(user.team_id)

            if(typeof directTeam.organisation_id === 'number'){
                organisations.push(await this.getOrganisationSafe(directTeam.organisation_id))
            }
        }

        return deduplicateIdArray(organisations)
    }

    async getOrganisationUsers(organisationId: number){
        return await db.manyOrNone<DBType_User>('SELECT DISTINCT u.* FROM users u WHERE EXISTS ( SELECT 1 FROM teams t WHERE t.id = u.team_id AND t.organisation_id = ${organisationId} ) OR EXISTS ( SELECT 1 FROM organisations o WHERE o.id = ${organisationId} AND o.owner_user_id = u.id ) OR EXISTS ( SELECT 1 FROM teams t2 WHERE t2.owner_user_id = u.id AND t2.organisation_id = ${organisationId} );', {organisationId})
    }

    async getOrganisationTeams(organisationId: number){
        return await select_Team(pgp.as.format('WHERE organisation_id = ${organisationId}', {organisationId}))
    }

    /**
     * also returns true if user owns the team through owning the parent organisation or being admin
     * @see userOwnsOrganisationDirectly
     */
    async userOwnsOrganisation(userId: number, organisationId: number){
        const organisation = await this.getOrganisationSafe(organisationId)

        if(organisation.owner_user_id === userId){
            return true
        }

        if(await getCore().modules.user.userIsAdmin(userId)){
            return true
        }

        return false
    }

    /**
     * @see userOwnsOrganisation
     */
    async userOwnsOrganisationDirectly(userId: number, organisationId: number){
        const organisation = await this.getOrganisationSafe(organisationId)
        return organisation.owner_user_id === userId
    }
}

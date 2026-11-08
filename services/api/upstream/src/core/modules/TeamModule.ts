import {DBUpdate_Team, delete_Team, insert_Team, select_Team, select_User, select_Workspace, update_Team, update_User} from '../../generated-definitions/db/DBHelpers'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'
import * as pgp from 'pg-promise'
import { DBType_Team, DBType_Team_StateType, DBType_User } from '../../generated-definitions/db/DBTypes'
import { getCore } from '..'
import {deduplicateIdArray} from '../../util/array'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

export default class TeamModule extends Module_Base<
    {
        id: number
    },

    {
        create_team: {
            eventDataType: DBType_Team,
            availableContexts: 'id'
        },
        update_team: {
            eventDataType: DBType_Team,
            availableContexts: 'id'
        },
        delete_team: {
            eventDataType: DBType_Team,
            availableContexts: 'id'
        }
    }
> {

    constructor(){
        super()
    }


    async createTeam(values: {
        name: string
        owner_user_id: number
        organisation_id: number
        state?: DBType_Team_StateType
    }){

        const team = await insert_Team(values)//TODO do we need to check for user id being correct or does the foreign key constraint kick in?

        this.dispatch('create_team', {
            id: team.id
        }, team)

        return team
    }

    /**
     *
     * @returns false if does not exist
     * @see updateTeamSafe
     */
    async updateTeam(id: number, data: DBUpdate_Team){
        const team = await update_Team(id, data)

        if(team === false){
            return false
        }

        this.dispatch('update_team', {
            id: team.id
        }, team)

        return team
    }

    /**
     *
     * @see updateTeam
     */
    updateTeamSafe = makeFunctionIdSafe(this, this.updateTeam)

    /**
     *
     * @returns false if does not exist
     * @see deleteTeamSafe
     */
    async deleteTeam(id: number){
        const team = await delete_Team(id)

        if(team === false){
            return false
        }

        this.dispatch('delete_team', {
            id: team.id
        }, team)
    }

    /**
     *
     * @see deleteTeam
     */
    deleteTeamSafe = makeFunctionIdSafe(this, this.deleteTeam)

    /**
     *
     * @returns false if does not exist
     * @see getTeamSafe
     */
    async getTeam(id: number){
        return await select_Team(id)
    }

    /**
     *
     * @see getTeam
     */
    getTeamSafe = makeFunctionIdSafe(this, this.getTeam)


    async userCanEditTeam(userId: number, teamId: number) {
        const team = await this.getTeamSafe(teamId)

        if(await getCore().modules.user.userIsAdmin(userId)){
            return true
        }

        if(typeof team.organisation_id === 'number' && await getCore().modules.organisation.userCanEditOrganisation(userId, team.organisation_id) === true){
            return true
        }

        if(team.owner_user_id === userId){
            return true
        }

        return false
    }

    async userCanViewTeam(userId: number, teamId: number) {
        if(await getCore().modules.user.userIsAdmin(userId)){
            return true
        }

        const team = await this.getTeamSafe(teamId)
        if(team.owner_user_id === userId){
            //owner
            return true
        }

        if((await getCore().modules.user.getUserSafe(userId)).team_id === teamId){
            //member
            return true
        }

        if(typeof team.organisation_id === 'number' && await getCore().modules.organisation.userCanViewOrganisation(userId, team.organisation_id)){
            //user can view parent organisation of team
            return true
        }

        return false
    }

    /**
     * also returns true if user owns the team through owning the parent organisation or being admin
     * @see userOwnsTeamDirectly
     */
    async userOwnsTeam(userId: number, teamId: number){
        const team = await this.getTeamSafe(teamId)
        if(team.owner_user_id === userId){
            return true
        }

        if(typeof team.organisation_id !== 'number'){
            return false
        }

        if(await getCore().modules.organisation.userOwnsOrganisation(userId, team.organisation_id)){
            return true
        }

        return false
    }

    /**
     * @see userOwnsTeam
     */
    async userOwnsTeamDirectly(userId: number, teamId: number){
        const team = await this.getTeamSafe(teamId)
        return team.owner_user_id === userId
    }

    async getTeamsUserOwns(user: DBType_User){
        return await select_Team(pgp.as.format('WHERE owner_user_id = ${userId}', {userId: user.id}))
    }

    async getTeamsUserHasAccessTo(user: DBType_User){

        const organisationsUserOwns = await getCore().modules.organisation.getOrganisationsUserOwns(user)

        const teams = await select_Team(pgp.as.format('WHERE owner_user_id = ${userId} OR id = ${teamId} OR organisation_id in (${orgIds:csv})', {
            userId: user.id,
            teamId: user.team_id,
            orgIds: organisationsUserOwns.map(org => org.id)
        }))

        if(typeof user.team_id === 'number'){
            teams.push(await this.getTeamSafe(user.team_id))
        }

        return deduplicateIdArray(teams)
    }

    async getTeamMembers(teamId: number){
        return await select_User(pgp.as.format('WHERE team_id = ${teamId}', {teamId}))
    }

    /**
     *
     * @returns false if user was already in different team
     */
    async inviteUserToTeam(teamId: number, email: string, invitedByUserId: number){

        let user = await getCore().modules.user.getUserForEmail(email)

        if(user === false){
            user = await getCore().modules.user.createUserFromEmail(email, invitedByUserId)
        }

        return await getCore().modules.user.assignUserToTeam(user.id, teamId)
    }

    /**
     * @returns false if team does not exist
     */
    async getWorkspacesForTeam(teamId: number){
        const team = await this.getTeam(teamId)

        if(team === false){
            return false
        }

        return await db.manyOrNone('SELECT DISTINCT workspaces.id, workspaces.* FROM workspaces INNER JOIN workspace_permissions ON workspace_permissions.workspace_id = workspaces.id WHERE workspace_permissions.team_id = ${teamId} OR workspaces.owner_team_id = ${teamId}', {teamId})
    }
}

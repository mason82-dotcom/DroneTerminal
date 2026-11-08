
import { getCore } from '..'
import TrafficSensing, { SensingHandle } from '../../aircraft_sensing/TrafficSensing'
import { DBInsert_Workspace, DBUpdate_Workspace, delete_Workspace, insert_Workspace, insert_Workspace_Permission, select_Geo_Object, select_Workspace, update_Workspace } from '../../generated-definitions/db/DBHelpers'
import { DBType_Workspace, DBType_Workspace_ForOrganisation, DBType_Workspace_ForTeam } from '../../generated-definitions/db/DBTypes'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'

import pgp from 'pg-promise'
import LiveUpdatedObjectManager, { LiveUpdatedObjectReference } from '../LiveUpdatedObjectManager'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

const WORKSPACE_TRAFFIC_SENSING_RADIUS = 1000 * 100 // 100km

type WorkspaceId = number

const aircraftSensing = new TrafficSensing()

export default class WorkspaceModule extends Module_Base<
    {
        id: number
    },

    {
        create_workspace: {
            eventDataType: DBType_Workspace,
            availableContexts: 'id'
        },
        update_workspace: {
            eventDataType: DBType_Workspace,
            availableContexts: 'id'
        },
        delete_workspace: {
            eventDataType: DBType_Workspace,
            availableContexts: 'id'
        }
    }
> {

    private readonly activeHandles = new Map<WorkspaceId, WorkspaceTrafficSensingHandles>()

    private readonly liveUpdatedObjectManager: LiveUpdatedObjectManager<DBType_Workspace> = new LiveUpdatedObjectManager()

    constructor(){
        super()
    }

    //TODO prefill collission objects for workspace when created or updated with new location, so that they are directly available when the client requests them for the first time
    async createWorkspace(data: DBInsert_Workspace){
        const workspace = await insert_Workspace(data)

        this.dispatch('create_workspace', {
            id: workspace.id
        }, workspace)

        return workspace
    }

    /**
     *
     * @returns false if does not exist
     * @see updateWorkspaceSafe
     */
    async updateWorkspace(id: number, data: DBUpdate_Workspace){
        const workspace = await update_Workspace(id, data)

        if(workspace === false){
            return false
        }

        if(typeof data.longitude === 'number' || typeof data.latitude === 'number'){
            const activeHandlesForWorkspace = this.activeHandles.get(workspace.id)

            if(activeHandlesForWorkspace){
                activeHandlesForWorkspace.restart()
            }
        }

        this.liveUpdatedObjectManager.updateLiveUpdatedObjectIfExists(id, workspace)

        this.dispatch('update_workspace', {
            id: workspace.id
        }, workspace)

        return workspace
    }

    /**
     * @see updateWorkspace
     */
    updateWorkspaceSafe = makeFunctionIdSafe(this, this.updateWorkspace)

    /**
     *
     * @returns false if does not exist
     */
    async deleteWorkspace(id: number){
        const workspace = await delete_Workspace(id)

        if(workspace === false){
            return false
        }

        this.dispatch('delete_workspace', {
            id: workspace.id
        }, workspace)
    }

    /**
     * @see deleteWorkspace
     */
    deleteWorkspaceSafe = makeFunctionIdSafe(this, this.deleteWorkspace)

    /**
     *
     * @returns false if does not exist
     * @see getWorkspaceSafe
     */
    async getWorkspace(id: number){
        return await select_Workspace(id)
    }


    /**
     * @see getWorkspace
     */
    getWorkspaceSafe = makeFunctionIdSafe(this, this.getWorkspace)

    //TODO move all the workspace scoped events in here ??? (like drone position and such)

    async inviteTeam(workspaceId: number, teamId: number){
        const workspace = await this.getWorkspaceSafe(workspaceId)

        await insert_Workspace_Permission({
            workspace_id: workspaceId,
            team_id: teamId
        })
    }

    async kickTeam(workspaceId: number, teamId: number){
        const workspace = await this.getWorkspaceSafe(workspaceId)

        const permissions = await this.getPermissions(workspaceId)

        if(!permissions.find(p => p.team_id === teamId)){
            throw new Error('team has no permissions for this workspace')
        }

        if(typeof (workspace as DBType_Workspace_ForTeam).owner_team_id === 'number'){
            if((workspace as DBType_Workspace_ForTeam).owner_team_id === teamId){
                throw new Error('team is the owner of this workspace and cannot be kicked')
            }
        }

        await db.none('DELETE FROM workspace_permissions WHERE workspace_id = ${workspaceId} AND team_id = ${teamId}', {
            workspaceId,
            teamId
        })
    }

    async getPermissions(workspaceId: number){
        return await db.manyOrNone<{team_id: number}>('SELECT team_id FROM workspace_permissions WHERE workspace_id = ${workspaceId}', {
            workspaceId
        })
    }

    async userOwnsWorkspace(workspaceId: number, userId: number){

        const workspace = await this.getWorkspaceSafe(workspaceId)

        if(await getCore().modules.user.userIsAdmin(userId)){
            return true
        }

        if(typeof (workspace as DBType_Workspace_ForTeam).owner_team_id === 'number'){
            return await getCore().modules.team.userOwnsTeam(userId, (workspace as DBType_Workspace_ForTeam).owner_team_id)
        } else {
            return await getCore().modules.organisation.userOwnsOrganisation(userId, (workspace as DBType_Workspace_ForOrganisation).owner_organisation_id)
        }
    }

    async getGeoObjectsForWorkspace(workspaceId: number){
        return await select_Geo_Object(pgp.as.format('WHERE geo_objects.workspace_id = ${workspaceId}', {
            workspaceId
        }))
    }

    async activateTrafficSensing(workspaceId: number): Promise<WorkspaceTrafficSensingHandle> {

        let activeHandlesForWorkspace = this.activeHandles.get(workspaceId)

        if(!activeHandlesForWorkspace){
            activeHandlesForWorkspace = new WorkspaceTrafficSensingHandles(await this.getLiveUpdatedWorkspace(workspaceId))
            this.activeHandles.set(workspaceId, activeHandlesForWorkspace)
        }

        return activeHandlesForWorkspace.makeHandle()
    }

    async getLiveUpdatedWorkspace(workspaceId: number){
        return this.liveUpdatedObjectManager.createLiveUpdatedObject(workspaceId, await this.getWorkspaceSafe(workspaceId))
    }

}

export class WorkspaceTrafficSensingHandle {
    private readonly handles: WorkspaceTrafficSensingHandles

    constructor(handles: WorkspaceTrafficSensingHandles){
        this.handles = handles
    }

    stop(){
        this.handles.stopHandle(this)
    }
}

export class WorkspaceTrafficSensingHandles {
    private sensingHandle?: SensingHandle
    private readonly handles: WorkspaceTrafficSensingHandle[]
    private readonly workspaceRef: LiveUpdatedObjectReference<DBType_Workspace>

    private isStopped = false

    constructor(workspaceRef: LiveUpdatedObjectReference<DBType_Workspace>){
        this.workspaceRef = workspaceRef
        this.handles = []
    }

    makeHandle(){
        const handle = new WorkspaceTrafficSensingHandle(this)
        this.handles.push(handle)

        if(this.handles.length === 1){
            this.setupSensingHandle().catch(err => {
                console.error('error while setting up sensing handle for workspace ' + this.workspaceRef.get().id, err)
            })
        }

        return handle
    }

    stopHandle(handle: WorkspaceTrafficSensingHandle){
        const handleIndex = this.handles.indexOf(handle)

        if(handleIndex < 0){
            if(this.isStopped){
                //already stopped
                return
            } else {
                console.warn('tried to stop a workspace traffic sensing handle that was not found in the active handles list, but the sensing was not marked as stopped. This should not happen and might be a sign of a bug. handle:', handle)
                return
            }
        }

        this.handles.splice(handleIndex, 1)

        if(this.handles.length === 0){
            this.tearDownSensingHandle()
        }
    }

    restart(){
        this.setupSensingHandle().catch(err => {
            console.error('error while restarting sensing handle for workspace ' + this.workspaceRef.get().id, err)
        })
    }

    private async setupSensingHandle(){

        if(this.sensingHandle){
            this.tearDownSensingHandle()
        }

        this.sensingHandle = aircraftSensing.startSensing(this.workspaceRef.get().latitude, this.workspaceRef.get().longitude, WORKSPACE_TRAFFIC_SENSING_RADIUS)

        this.sensingHandle.addListener('traffic', getCore().modules.geoObject.processTrafficSensingData.bind(getCore().modules.geoObject))
    }

    private tearDownSensingHandle(){
        if(this.sensingHandle){
            this.sensingHandle.stop()
        }
        this.isStopped = true
    }
}

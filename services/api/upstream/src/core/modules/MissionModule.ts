
import { DBInsert_Mission, DBUpdate_Mission, delete_Mission, insert_Mission, select_Mission, select_Task, update_Mission } from '../../generated-definitions/db/DBHelpers'
import { DBType_Mission, DBType_Mission_STATES, DBType_Mission_StateType } from '../../generated-definitions/db/DBTypes'
import { registerSubscribableEvent, SubscribableEventHandler } from '../../live-websocket/websocket'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'
import * as pgp from 'pg-promise'

export default class MissionModule extends Module_Base<
    {
        id: number
        team_id: number | undefined
    },

    {
        create_mission: {
            eventDataType: DBType_Mission,
            availableContexts: 'team_id'
        },
        update_mission: {
            eventDataType: DBType_Mission,
            availableContexts: 'id' | 'team_id'
        },
        delete_mission: {
            eventDataType: DBType_Mission,
            availableContexts: 'id' | 'team_id'
        }
    }
> {

    readonly subscribableEventHandlerMission: SubscribableEventHandler<'mission'>

    constructor(){
        super()

        this.subscribableEventHandlerMission = registerSubscribableEvent('mission', (event, filter)=>{

            const missionId = parseInt(filter)

            if(isNaN(missionId)){
                throw new Error('invalid syntax for filter: "' + filter + '"')
            }

        })


        //TODO recalculate missions state based on substask states?
        /*
        getCore().modules.task.listenTo('create_task', false, (eventName, contexts, eventData) => {

        })

        getCore().modules.task.listenTo('update_task', false, (eventName, contexts, eventData) => {

        })

        getCore().modules.task.listenTo('delete_task', false, (eventName, contexts, eventData) => {

        })
        */
    }

    async createMission(data: DBInsert_Mission){
        const mission = await insert_Mission(data)

        this.dispatch('create_mission', {
            team_id: mission.assigned_to_team_id
        }, mission)

        return mission
    }

    /**
     *
     * @returns false if does not exist
     * @see updateMissionSafe
     */
    async updateMission(id: number, data: DBUpdate_Mission){
        const mission = await update_Mission(id, data)

        if(mission === false){
            return false
        }

        this.dispatch('update_mission', {
            id: mission.id,
            team_id: mission.assigned_to_team_id
        }, mission)

        this.subscribableEventHandlerMission.triggerListener('' + mission.id, {
            event_type: 'update',
            data: mission
        })

        return mission
    }

    /**
     * @see updateMission
     */
    updateMissionSafe = makeFunctionIdSafe(this, this.updateMission)

    /**
     *
     * @returns false if does not exist
     */
    async deleteMission(id: number){
        const mission = await delete_Mission(id)

        if(mission === false){
            return false
        }

        this.dispatch('delete_mission', {
            id: mission.id,
            team_id: mission.assigned_to_team_id
        }, mission)

        this.subscribableEventHandlerMission.triggerListener('' + mission.id, {
            event_type: 'delete',
            data: undefined
        })
    }

    /**
     * @see deleteMission
     */
    deleteMissionSafe = makeFunctionIdSafe(this, this.deleteMission)

    /**
     *
     * @returns false if does not exist
     * @see getMissionSafe
     */
    async getMission(id: number){
        return await select_Mission(id)
    }


    /**
     * @see getMission
     */
    getMissionSafe = makeFunctionIdSafe(this, this.getMission)

    async getTasksForMission(missionId: number){
        return await select_Task(pgp.as.format('WHERE mission_id = ${missionId}', {missionId}))
    }

    /**
     * @param state if its not a number, then default will be used
     */
    validateMissionState(state: any): DBType_Mission_StateType {
        if(typeof state === 'number'){
            if(Object.values(DBType_Mission_STATES).includes(state as unknown as DBType_Mission_StateType)){
                return state as DBType_Mission_StateType
            }
            throw new Error('invalid mission state: ' + state)
        } else {
            return 0
        }

    }
}


import { DBInsert_Task, DBUpdate_Task, delete_Task, insert_Task, select_Task, update_Task } from '../../generated-definitions/db/DBHelpers'
import { DBType_Geo_Object, DBType_Task, DBType_Task_STATES, DBType_Task_StateType } from '../../generated-definitions/db/DBTypes'
import { registerSubscribableEvent, SubscribableEventHandler } from '../../live-websocket/websocket'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'

//@ts-ignore
const db = global.db as pgp.IDatabase<any>

export default class TaskModule extends Module_Base<
    {
        id: number
        mission_id: number
    },

    {
        create_task: {
            eventDataType: DBType_Task,
            availableContexts: 'mission_id'
        },
        update_task: {
            eventDataType: DBType_Task,
            availableContexts: 'id' | 'mission_id'
        },
        delete_task: {
            eventDataType: DBType_Task,
            availableContexts: 'id' | 'mission_id'
        }
    }
> {

    readonly subscribableEventHandlerTask: SubscribableEventHandler<'task'>

    constructor(){
        super()

        this.subscribableEventHandlerTask = registerSubscribableEvent('task', (event, filter)=>{

            const taskId = parseInt(filter)

            if(isNaN(taskId)){
                throw new Error('invalid syntax for filter: "' + filter + '"')
            }

        })
    }

    async createTask(data: DBInsert_Task){
        const task = await insert_Task(data)

        this.dispatch('create_task', {
            mission_id: task.mission_id
        }, task)

        return task
    }

    /**
     *
     * @returns false if does not exist
     * @see updateTaskSafe
     */
    async updateTask(id: number, data: DBUpdate_Task){
        const task = await update_Task(id, data)

        if(task === false){
            return false
        }

        this.dispatch('update_task', {
            id: task.id,
            mission_id: task.mission_id
        }, task)

        this.subscribableEventHandlerTask.triggerListener('' + task.id, {
            event_type: 'update',
            data: task
        })

        return task
    }

    /**
     * @see updateTask
     */
    updateTaskSafe = makeFunctionIdSafe(this, this.updateTask)

    /**
     *
     * @returns false if does not exist
     */
    async deleteTask(id: number){
        const task = await delete_Task(id)

        if(task === false){
            return false
        }

        this.dispatch('delete_task', {
            id: task.id,
            mission_id: task.mission_id
        }, task)

        this.subscribableEventHandlerTask.triggerListener('' + task.id, {
            event_type: 'delete',
            data: undefined
        })
    }

    /**
     * @see deleteTask
     */
    deleteTaskSafe = makeFunctionIdSafe(this, this.deleteTask)

    /**
     *
     * @returns false if does not exist
     * @see getTaskSafe
     */
    async getTask(id: number){
        return await select_Task(id)
    }


    /**
     * @see getTask
     */
    getTaskSafe = makeFunctionIdSafe(this, this.getTask)


    /**
     * @param state if its not a number, then default will be used
     */
    validateTaskState(state: any): DBType_Task_StateType {
        if(typeof state === 'number'){
            if(Object.values(DBType_Task_STATES).includes(state as unknown as DBType_Task_StateType)){
                return state as DBType_Task_StateType
            }
            throw new Error('invalid task state: ' + state)
        } else {
            return 0
        }

    }

    async getGeoObjectsForTask(taskId: number){
        return await db.manyOrNone('SELECT geo_objects.* FROM geo_objects INNER JOIN task_geo_objects ON geo_objects.id = task_geo_objects.geo_object_id WHERE task_geo_objects.task_id = ${taskId}', { taskId }) as DBType_Geo_Object[]
    }
}

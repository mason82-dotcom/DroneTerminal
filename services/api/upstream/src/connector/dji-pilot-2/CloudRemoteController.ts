import { EventManagerWithPublicDispatch } from '../../util/event_manager'
import Connector, { DroneConnectionConnector, Message_Type_Event, Message_Type_Osd, Message_Type_Services, Message_Type_Services_Method, Message_Type_State, Message_Type_Status } from './Connector'


type CloudRemoteController_InternalEvents = {
    'message_state': Message_Type_State,
    'message_status': Message_Type_Status,
    'message_osd': Message_Type_Osd,
    'message_event': Message_Type_Event,
    'message_services': Message_Type_Services
}

export default class CloudRemoteController {

    private readonly connector: DroneConnectionConnector
    private readonly WAIT_FOR_EVENT_TIMEOUT_DEFAULT = 1000 * 10

    private readonly internalEventManager = new EventManagerWithPublicDispatch<CloudRemoteController_InternalEvents>()

    constructor(connector: DroneConnectionConnector){
        this.connector = connector

        this.connector.onMessage_State((message)=>{
            this.internalEventManager.dispatch('message_state', message)
        })

        this.connector.onMessage_Status((message, respond)=>{
            this.internalEventManager.dispatch('message_status', message as Message_Type_Status)// TODO fix the typing here (it works for onMessage_State, why not here?)
        })

        this.connector.onMessage_Osd((message)=>{
            this.internalEventManager.dispatch('message_osd', message)
        })

        this.connector.onMessage_Event((message, respond)=>{
            this.internalEventManager.dispatch('message_event', message as Message_Type_Event)// TODO fix (see onMessage_Status)
        })
    }


    async startControl(){
        // see https://developer.dji.com/doc/cloud-api-tutorial/en/api-reference/pilot-to-cloud/mqtt/rc-pro/drc.html#request-cloud-control-authorization

        return new Promise<void>((resolve, reject)=>{

            //TODO remove this.waitForServicesReply and instead fuly use the onResponseCallback of this.connector.sendMessage()
            this.waitForServicesReply('cloud_control_auth_request').then(msg => {
                //TODO TODO: use documented.ts types

                //@ts-ignore
                if(msg.data.result === 0){
                    resolve()
                } else {
                    //@ts-ignore
                    reject(msg.data.message)//TODO is this correct?
                }
            })

            this.connector.sendMessage('thing/product/$/services', Connector.makeMessage<Message_Type_Services>({//TODO use documented.ts types
                method: 'cloud_control_auth_request'
            }, {
                user_id: "someuserid",//TODO
                user_callsign: "OFH CloudRemoteControl",
                control_keys: 'flight'//TODO what other options do we have here?
            }), message=>{
                console.log('got reply for startControl()', message)
            })

        })
    }

    async stopControl(){
        //TODO
    }

    async takePicture(){//TODO check if we need to have remote control for this to work
        // see https://developer.dji.com/doc/cloud-api-tutorial/en/api-reference/pilot-to-cloud/mqtt/rc-pro/drc.html#payload-control-start-capturing


        return new Promise<void>((resolve, reject)=>{

            //TODO this is not really cool, shouldnt we instead use a more general reply solution (where connector knows, that tid belongs to a previous message and then relays the response from the drone)

            this.waitForServicesReply('camera_photo_take').then(msg => {
                //TODO TODO: use documented.ts types

                //@ts-ignore
                if(msg.data.result === 0){
                    resolve()
                } else {
                    //@ts-ignore
                    reject(msg.data.message)//TODO is this correct?
                }
            })

            this.connector.sendMessage('thing/product/$/services', Connector.makeMessage<Message_Type_Services>({//TODO use documented.ts types
                method: 'camera_photo_take'
            }, {
                payload_index: "mycamera" //TODO
            }))

        })

    }

    private waitForServicesReply(methodName: Message_Type_Services_Method, customTimeout?: number){
        return this.waitFor('message_services', methodName, customTimeout)
    }

    private waitFor<MethodName extends string, Event extends Extract<keyof CloudRemoteController_InternalEvents, 'message_event' | 'message_services'>>(messageEvent: Event, methodName: MethodName, customTimeout?: number){

        let promiseState: 'ongoing' | 'resolved' | 'rejected' = 'ongoing'

        return new Promise<CloudRemoteController_InternalEvents[Event]>((resolve, reject)=>{

            const cb = (message: CloudRemoteController_InternalEvents[Event]) => {

                if(message.method !== methodName){
                    return
                }

                if(promiseState === 'ongoing'){
                    promiseState = 'resolved'

                    this.internalEventManager.removeListener(messageEvent, cb)
                    resolve(message)
                }
            }

            this.internalEventManager.addListener(messageEvent, cb)

            setTimeout(()=>{
                if(promiseState === 'ongoing'){
                    promiseState = 'rejected'

                    this.internalEventManager.removeListener(messageEvent, cb)
                    reject('timeout')
                }
            }, typeof customTimeout === 'number' ? customTimeout : this.WAIT_FOR_EVENT_TIMEOUT_DEFAULT)
        })
    }

}
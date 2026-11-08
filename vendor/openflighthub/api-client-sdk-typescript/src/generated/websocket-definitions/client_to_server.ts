import * as server_to_client from './server_to_client'

export type Message<T extends Message_Type> = {
    type: T
    data: Message_Data<T>
    messageId: number
}

export type Message_Type = 'error' | 'answer' | 'subscribe'

export type Message_Data<T extends Message_Type> = T extends 'answer' ? Message_Type_Answer_Data<any> : T extends 'subscribe' ? Message_Type_Subscribe_Data : T extends 'error' ? string : unknown

export type Message_Type_Answer_Data<R extends any> = {
    success: boolean
    result: R
}

export type Message_Type_Subscribe_Data = {
    event: server_to_client.Message_Type_Event_Type
    filter: string
}

import * as express from 'express';
import * as ws from "ws";
import { handleNewClient } from '../live-websocket/websocket'
const router = express.Router()

router.ws('/', (ws: ws.WebSocket, req) => {//TODO implement deny handshake when user is not authenticated (right now we open the connection, then check, then close) https://github.com/websockets/ws/blob/HEAD/doc/ws.md#new-websocketserveroptions-callback https://github.com/websockets/ws/issues/377 https://github.com/expressjs/express/issues/2556


    req.GM.guardUserIsAuthenticated().then(user=>{//TODO check permissions

        handleNewClient(ws, req, user)

    }).catch(()=>{
        ws.close(4001, 'Unauthorized')
    })
})

export default router
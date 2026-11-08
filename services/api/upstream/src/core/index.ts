import GeoObjectModule from './modules/GeoObjectModule'
import ConnectionModule from './modules/ConnectionModule'
import FileModule from './modules/FileModule'
import UserModule from './modules/UserModule'
import TeamModule from './modules/TeamModule'
import DroneModule from './modules/DroneModule'
import FlightModule from './modules/FlightModule'
import RemoteControllerModule from './modules/RemoteControllerModule'
import DroneMediaModule from './modules/DroneMediaModule'
import WorkspaceModule from './modules/WorkspaceModule'
import OrganisationModule from './modules/OrganisationModule'
import MissionModule from './modules/MissionModule'
import TaskModule from './modules/TaskModule'


let coreInstance: Core

export default class Core {

    readonly modules: {
        readonly geoObject: GeoObjectModule
        readonly connection: ConnectionModule
        readonly file: FileModule
        readonly user: UserModule
        readonly team: TeamModule
        readonly organisation: OrganisationModule
        readonly drone: DroneModule
        readonly flight: FlightModule
        readonly remoteController: RemoteControllerModule
        readonly droneMedia: DroneMediaModule
        readonly workspace: WorkspaceModule
        readonly mission: MissionModule
        readonly task: TaskModule
    }

    constructor(){

        if(coreInstance){
            throw new Error('core instance already existing')
        }

        coreInstance = this

        this.modules = {
            geoObject: new GeoObjectModule(),
            connection: new ConnectionModule(),
            file: new FileModule(),
            user: new UserModule(),
            team: new TeamModule(),
            organisation: new OrganisationModule(),
            drone: new DroneModule(),
            flight: new FlightModule(),
            remoteController: new RemoteControllerModule(),
            droneMedia: new DroneMediaModule(),
            workspace: new WorkspaceModule(),
            mission: new MissionModule(),
            task: new TaskModule()
        } as const
    }

}

export function getCore(){
    return coreInstance
}

// core.geoObject.create_marking_point({
//     name: 'name',
//     workspaceId: 1
// }, {
//     longitude: 42,
//     latitude: 10
// })
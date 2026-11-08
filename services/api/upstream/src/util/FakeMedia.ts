import { getCore } from '../core'
import { DBType_Drone_Media_TYPES } from '../generated-definitions/db/DBTypes'
import FakeDrone from './FakeDrone'

export default class FakeMedia {

    private drone: FakeDrone

    constructor(fakeDrone: FakeDrone){
        this.drone = fakeDrone

        setInterval(async()=>{

            const currentPosition = this.drone.getTrack().getCurrentPosition()
            const currentHeight = this.drone.getTrack().getCurrentHeight()
            const currentHeading = this.drone.getTrack().getCurrentHeading()

            const media = await getCore().modules.droneMedia._createRaw({
                drone_id: this.drone.getId(),
                flight_id: await this.drone.getFlightId(),
                file_id: 1,
                fingerprint: 'fake',
                tiny_fingerprint: 'fake',
                type: DBType_Drone_Media_TYPES.picture,
                camera_location: JSON.stringify({
                    position: {
                        longitude: currentPosition.longitude,
                        latitude: currentPosition.latitude
                    },
                    height: currentHeight
                }),
                camera_angles: JSON.stringify({
                    heading: currentHeading,
                    pitch: -15// TODO get from file
                }),
                captured_at: '2025-04-11T17:19:30',
                meta: JSON.stringify({"ext":{"drone_model_key":"0-60-0","file_group_id":"","is_original":true,"line_name":"","payload_model_key":"1-43-0","shoot_position":0,"sn":"DRONE_FAKE","task_name":"","tinny_fingerprint":"b1cd370ab26d0f9a44adb0c7353f8d6d_2025_4_11_17_19_30"},"metadata":{"absolute_altitude":currentHeight,"created_time": new Date().toISOString(),"gimbal_yaw_degree": currentHeading,"photoed_position":{"lat":0,"lng":0},"relative_altitude":0,"shoot_position":{"lat": currentPosition.latitude,"lng":currentPosition.longitude}}})
            })

            setTimeout(()=>{
                //delete after 10 minutes

                getCore().modules.droneMedia.deleteDroneMedia(media.id)

            }, 1000 * 60 * 10)

        }, 1000 * 30)
    }

}
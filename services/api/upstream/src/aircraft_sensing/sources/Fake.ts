import { DBType_Geo_Object_SubType_TYPES } from "../../generated-definitions/db/DBTypes";
import FakeTrack from "../../util/FakeTrack";
import { SensingSourceArea } from "../Source";


export default class FakeArea extends SensingSourceArea {

    private readonly myId = 'fake'
    private fakeTrack: FakeTrack
    //@ts-ignore
    private intervalHandle: ReturnType<typeof setInterval>

    constructor(latitude: number, longitude: number, radius: number){
        super(latitude, longitude, radius)

        this.fakeTrack = new FakeTrack([
            [10.221,47.558,1400],
            [10.285,47.544,1600],
            [10.350,47.561,1900],
            [10.290,47.587,1600]], 200)
    }

    protected onSetup(): void {

        this.intervalHandle = setInterval(()=>{

            const currentPosition = this.fakeTrack.getCurrentPosition()

            this.dispatch('traffic', {
                id: this.myId,
                name: this.myId,
                type: DBType_Geo_Object_SubType_TYPES.traffic.ufo,
                position: {
                    latitude: currentPosition.latitude,
                    longitude: currentPosition.longitude,
                    height: this.fakeTrack.getCurrentHeight(),
                    reported_at: new Date().toISOString()
                }
            })

        }, 1000 * 2)
    }

    protected onShutdown(): void {
        clearInterval(this.intervalHandle)
    }
}

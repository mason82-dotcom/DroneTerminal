export default class LiveUpdatedObjectManager<ObjectType> {

    private readonly liveUpdatedObjects: Map<number, LiveUpdatedObject<ObjectType>> = new Map()

    createLiveUpdatedObject(id: number, data: ObjectType){
        let liveUpdatedObject = this.liveUpdatedObjects.get(id)

        if(!liveUpdatedObject){
            liveUpdatedObject = new LiveUpdatedObject(this, id, data)
            this.liveUpdatedObjects.set(id, liveUpdatedObject)
        }

        return liveUpdatedObject.createReference()
    }

    updateLiveUpdatedObjectIfExists(id: number, newData: ObjectType){
        const liveUpdatedObject = this.liveUpdatedObjects.get(id)
        if(liveUpdatedObject){
            liveUpdatedObject.update(newData)
        }
    }

    _deleteLiveUpdatedObject(liveUpdatedObject: LiveUpdatedObject<ObjectType>){
        this.liveUpdatedObjects.delete(liveUpdatedObject.id)
    }
}

export class LiveUpdatedObject<ObjectType> {

    readonly id: number
    private object: ObjectType
    private manager: LiveUpdatedObjectManager<ObjectType>
    private references: LiveUpdatedObjectReference<ObjectType>[] = []

    /**
     *
     * @param deleteCallback called if no more references to the object exist
     */
    constructor(manager: LiveUpdatedObjectManager<ObjectType>, id: number, initialObject: ObjectType){
        this.object = initialObject
        this.manager = manager
        this.id = id
    }

    update(newObject: ObjectType){
        this.object = Object.freeze(JSON.parse(JSON.stringify(newObject)))
    }

    get(){
        return this.object
    }

    createReference(){
        const ref = new LiveUpdatedObjectReference(this)
        this.references.push(ref)
        return ref
    }

    deleteReference(reference: LiveUpdatedObjectReference<ObjectType>){
        const index = this.references.indexOf(reference)

        if(index !== -1){
            this.references.splice(index, 1)
        }

        if(this.references.length === 0){
            this.manager._deleteLiveUpdatedObject(this)
        }
    }
}

export class LiveUpdatedObjectReference<ObjectType> {

    private liveUpdatedObject: LiveUpdatedObject<ObjectType>

    constructor(liveUpdatedObject: LiveUpdatedObject<ObjectType>){
        this.liveUpdatedObject = liveUpdatedObject
    }

    get(){
        return this.liveUpdatedObject.get()
    }

    /**
     * call this before you stop using the reference (to reduce memory footprint)
     */
    destroy(){
        this.liveUpdatedObject.deleteReference(this)
    }

}

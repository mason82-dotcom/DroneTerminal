import LiveUpdatedObjectManager from '../../core/LiveUpdatedObjectManager'


describe('LiveUpdatedObjectManager', ()=>{

    it('should work', async()=>{

        const manager = new LiveUpdatedObjectManager<{a: string}>()

        const reference = manager.createLiveUpdatedObject(1, {a: 'initial'})

        expect(reference.get().a).toEqual('initial')

        manager.updateLiveUpdatedObjectIfExists(1, {a: 'updated'})

        expect(reference.get().a).toEqual('updated')
    })

})


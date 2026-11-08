/**
 * Usage:
 *
 * const waitable = await makeWaitable()

  waitable.promise.then(()=>{
    console.log('promise done')
  })

  setTimeout(()=>{
    waitable.finish()
  }, 1000 * 3)

 */
export class Waitable {

    private promise: Promise<void>
    private resolve: (value: void)=>void
    private reject: (reason?: any)=>void

    /**
     * use Waitable.make() please
     */
    constructor(promise: Waitable["promise"], resolve: Waitable["resolve"], reject: Waitable["reject"]){
        this.promise = promise
        this.resolve = resolve
        this.reject = reject
    }

    getPromise(){
        return this.promise
    }

    finish(){
        this.resolve()
    }

    cancel(){
        this.reject()
    }

    static async make(){
        const prom = await setupPromise()
        return new Waitable(prom.promise, prom.resolve, prom.reject)
    }
}

async function setupPromise(){

    let theInnerResolve: (value: void)=>void
    let theInnerReject: (reason?: any)=>void
    let theInnerProm: Promise<void>

    const prom = new Promise<void>(resolve=>{

        const innerProm = new Promise<void>((resolveInner, rejectInner)=>{
            theInnerResolve = resolveInner
            theInnerReject = rejectInner

            resolve()
        })

        theInnerProm = innerProm
    })

    await prom

    return {
        //@ts-ignore
        promise: theInnerProm,
        //@ts-ignore
        resolve: theInnerResolve,
        //@ts-ignore
        reject: theInnerReject
    }
}

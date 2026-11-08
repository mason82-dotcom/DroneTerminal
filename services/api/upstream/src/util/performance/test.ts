import {measurePerformance} from './index'

export async function test(){
    console.log('Testing performance measurement...')
    console.log('Synchronous function:', await measurePerformance(example_sync, [99]))
    console.log('Asynchronous function with wait:', await measurePerformance(example_async_wait))
    console.log('Asynchronous function with wait and work:', await measurePerformance(example_async_wait_and_work))
}

function example_sync(off: number){
    let i = 1;
    while(i < 1000000000){
        i += 0.1
    }
    return i + off
}

function example_async_wait(){
    return new Promise(resolve => setTimeout(resolve, 1000))
}

function example_async_wait_and_work(){
    return new Promise<void>(resolve => setTimeout(()=>{
        example_sync(98)
        resolve()
    }, 1000))
}
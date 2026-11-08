import { performance } from 'perf_hooks'

/**
    breaks the binding of `this`
    Use an arrow function to preserve the context!

    @param onMeasured only called if function runs without throwing an exception / promise rejecting
**/
export function measurePerformanceMiddleware<F extends (...args: any) => any>(fn: F, onMeasured: (runtime: number, worktime: number)=>void) {
    return function(...args: Parameters<F>){
        const ret = measurePerformance(fn, args)
        if(ret instanceof Promise){
            return new Promise<Awaited<ReturnType<F>>>((resolve, reject)=>{
                ret.then(({runtime, worktime, result})=>{
                    try {
                        onMeasured(runtime, worktime)
                    }catch(error){
                        console.error('Error in onMeasured callback of measurePerformanceMiddleware:', error)
                    }
                    resolve(result)
                }).catch(reject)
            })
        } else {
            try {
                onMeasured(ret.runtime, ret.worktime)
            }catch(error){
                console.error('Error in onMeasured callback of measurePerformanceMiddleware:', error)
            }

            return ret.result
        }
    } as F
}

export function measurePerformance<F extends (...args: any) => any>(fn: F, args?: Parameters<F>){
    const start = performance.now()
    const cpuStart = process.cpuUsage()
    let result = fn(...(args || []))
    if (result instanceof Promise) {
        return new Promise<ReturnType<typeof calculateRet>>((resolve, reject)=>{
            result.then(resolvedResult => {
                resolve(calculateRet(start, cpuStart, resolvedResult))
            }).catch(reject)
        })
    } else {
        return calculateRet(start, cpuStart, result)
    }

    function calculateRet(start: number, cpuStart: NodeJS.CpuUsage, result: any) {
        const wallTime = performance.now() - start

        const cpu = process.cpuUsage(cpuStart)
        const cpuTimeMs = (cpu.user + cpu.system) / 1000
        const idleTimeMs = wallTime - cpuTimeMs
        //TODO this might not be exact (if there are other heavy workloads in the system, they probably count towards this functions execution time, even though they are not part of it)

        return {
            runtime: wallTime,
            worktime: wallTime - Math.max(0, idleTimeMs),
            result: result as (ReturnType<F> extends Promise<any> ? Awaited<ReturnType<F>> : ReturnType<F>)
        }
    }
}

/*
TODO node 25 supports this natively
https://nodejs.org/api/perf_hooks.html#perf-hookstimerifyfn-options

import {
  timerify,
  performance,
  PerformanceObserver,
} from 'node:perf_hooks';


export function measurePerformance(fn: Function): Promise<number> {

    const wrapped = timerify(fn);

    const obs = new PerformanceObserver((list) => {
    console.log(list.getEntries()[0].duration);

    performance.clearMarks();
    performance.clearMeasures();
    obs.disconnect();
    });
    obs.observe({ entryTypes: ['function'] });

    // A performance timeline entry will be created
    wrapped();
}


*/
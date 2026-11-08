import {parseBeastSocketData} from './parse'
import {BeastHandler} from './beast_handler'
import {EXAMPLE_LINES} from './example_lines'

export default function runExample(){

    singleDataExample()

    handlerExample()
}

function singleDataExample(){

    // this message has been recorded at roughly new Date('2025-01-29T11:42:00.000Z') which should result in gps seconds of day: 42138 and gps day of year 31
    const line2 = Buffer.from("GjP/AE1MQWAfjUQGjljTAG7X1ZSaUHwaM/8ATUxBYA2NRAAcWLFxPQWSzm05yRoz/wBNTEFgDY1EAByZCBw6MByhwLV0GjP/AE1MQWAbjahVPFjJA4s27cSLYRcaM/8ATUxBYAqNQH/KmRSrAlg4heuZ2hoy/wBNTEFgDAAFAj2cAtQaMv8ATUxBYAxdRAGq0ejDGjP/AE1MQWASjatyaOEQswAAAABvknUaM/8ATUxBYNWoAAu8/75lGb/sbHKjUhoz/wBNTEFgDKAAFxj/2JMyIATiDxg0GjP/AE1MQWA3jUQGBFi99ZGJprOJ9KsaM/8ATUxBYB2NTSJvYLUFSyiYLjcXWBoz/wBNTEFgDo1LGALhE5cAAAAAE8lcGjP/AE1MQWALjUyt5Vi5h5HSR8dwjWkaM/8ATUxBYBiNCgCQIxASMsMtoHCsfRoz/wBNTEFgUI00MoKZlJmMAFgLp1D4GjP/AE1MQWBlqAARG+W6NS+/3AEQbVsaM/8ATUxBYBiNCgCQ+CEAAgBJuBZ7fhoz/wBNTEFgPqgAAQr/+60bYCR71Boaihoz/wBNTEFgFY1MrfkjSZS504Dg2XToGjP/AE1MQWBCjegEaPghAAIASbwBa6waM/8ATUxBYFCoABQT1WnvL//H/mNZDBoz/wBNTEFgTo2sb1eZDUCfYAyI2WuSGjP/AE1MQWBPoAAXn4AaGlcvv/zXhw5SGjP/AE1MQWBEjUvISVi99vJoG5754bEaM/8ATUxBYBuNS7IE+CMAAgBJuPGGaBoz/wBNTEFgII2nPdPhGhoFAAAAAOY/Yhoz/wBNTEFgaY2ml8+ZDKiW6ASWyhoa4hoz/wBNTEFgEo2nPdNYR0YVwMJTxRneGjP/AE1MQWAUjaqyv1jBYXaKQoDUXTwaMv8ATUxBYAsgABQgGX/zGjP/AE1MQWD5jafbC1hFYH0Ha2LIiQgaM/8ATUxBYO2Np9sLmQk0HMCwExBxWxoz/wBNTEFgd42iBBVZYgRQZznFqNMPGjP/AE1MQWAVoAAXsIM58TAgLAC5OOoaM/8ATUxBYBaNRABQWL8CT7dSKqk4CBoz/wBNTEFgFqgAEKKAMPs9YATaXWkVGjP/AE1MQWASjU0kIFhFtHOzuSxuSGMaM/8ATUxBYBKNTSQg+CMAAwBJuNPktRoy/wBNTEFgCl1EADcnvwgaM/8ATUxBYBiNdYJM4QGNAAAAADzpJxoz/wBNTEFg0411hyOZCIcOOCwMtbGKGjP/AE1MQWAbjXWCTFhB5P2Ybh0uoHsaM/8ATUxBYD2NdYJMmQxkqphoJ96kZRoz/wBNTEFgU4+m7rkjKJB1w2ygWBa0GjP/AE1MQWCbjaYVkiNUEzPnHGCyQKEaMv8ATUxBYGJfpu65pqJEGjP/AE1MQWAVjay6MFihBNgeaHEgcBkaM/8ATUxBYCWNp7ihmQxan0C4lZv6ahoz/wBNTEFgB4055KwjBGSz3QIg2S2RGjP/AE1MQWAMoAAVue3KGzCgJACYvgQaM/8ATUxBYBONcGBXWLmHmsEiKqLsiBoz/wBNTEFgFo1GktpYqfdUBamihFIXGjP/AE1MQWAtjTnkrFihJ8KzF6KS2/8=", 'base64')

    parseBeastSocketData(line2)
}

function handlerExample(){
    const handler = new BeastHandler()

    handler.addListener('aircraft_new', (ac)=>{
        console.log('new aircraft', ac)
    })

    handler.addListener('aircraft_update_with_location', (ac)=>{
        console.log('updated aircraft location', ac)
    })

    handler.addListener('warning', (w)=>{
        //console.warn(w.message, w.context)
    })

    for(const line of EXAMPLE_LINES){
        handler.handleBeastData(Buffer.from(line, 'base64'))
    }

    console.log('example done')
}

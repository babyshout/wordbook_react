let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

console.log(new Date().toISOString().replace(/T.*$/, ''))

// let timed_event_12123 = new Date()
// console.log('timed_event_12123 -> ', timed_event_12123)
// timed_event_12123 = timed_event_12123.toISOString()
// console.log('timed_event_12123 -> ', timed_event_12123)
// timed_event_12123 =new Date( timed_event_12123)
// // timed_event_12123 =Date.parse( timed_event_12123)
// console.log('timed_event_12123 -> ', timed_event_12123)
// // timed_event_12123 = timed_event_12123.toDateString()
// // console.log('timed_event_12123 -> ', timed_event_12123)
// // timed_event_12123 = timed_event_12123.toLocaleDateString()

export const INITIAL_EVENTS = [
    {
        // id: createEventId(),
        title: 'All-day event',
        start: todayStr
    },
    {
        // id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00'
    },
    {
        // id: createEventId(),
        title: 'Timed event12123',
        start: new Date()
    }
]

export function createEventId() {
    return String(eventGuid++)
}

export const TASK_STATES = {
    planned: 0,
    accepted: 1,
    'in progress': 2,
    done: 3,
    rejected: 4,
    failed: 5,
    canceled: 6
} as const

export const TASK_COLOR_MAP = [{
    value: 0, color: '#bcbcbc'
}, {
    value: 1, color: '#6fa8dc'
}, {
    value: 2, color: '#ffd966'
}, {
    value: 3, color: '#38761d'
}, {
    value: 4, color: '#a22f85'
}, {
    value: 5, color: '#a00'
}, {
    value: 6, color: '#9f580d'
}]

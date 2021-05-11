function eventReducer(state = [], action) {
    switch (action.type) {
        case 'SHOW_EVENT':
            console.log('in eventReducer ', action.payload.event)
            return action.payload.event

        default:
            return state
    }
}

export default eventReducer;
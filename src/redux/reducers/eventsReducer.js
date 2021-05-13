function eventsReducer(state = [], action) {
    switch (action.type) {
        case 'GET_EVENT':
            return action.payload.event

        case 'GET_USER_EVENTS':
            return action.payload

        default:
            return state
    }
}

export default eventsReducer;
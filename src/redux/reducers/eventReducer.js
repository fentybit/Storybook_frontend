function eventReducer(state = [], action) {
    switch (action.type) {
        case 'GET_EVENT':
            return action.payload.event

        default:
            return state
    }
}

export default eventReducer;
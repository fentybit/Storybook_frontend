function eventReducer(state = [], action) {
    switch (action.type) {
        case 'GET_EVENT':
            console.log(action.payload.event)
            return action.payload.event

        default:
            return state
    }
}

export default eventReducer;
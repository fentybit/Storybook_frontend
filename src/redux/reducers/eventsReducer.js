function eventsReducer(state = [], action) {
    switch (action.type) {
        case 'GET_USER_EVENTS':
            console.log(action.payload)
            return action.payload

        default:
            return state
    }
}

export default eventsReducer;
function categoryReducer(state = [], action) {
    switch (action.type) {
        case 'GET_EVENT':
            return action.payload.category

        default:
            return state
    }
}

export default categoryReducer;
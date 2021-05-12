function categoryReducer(state = [], action) {
    switch (action.type) {
        case 'GET_EVENT':
            console.log('in categoryReducer ', action.payload.category)
            return action.payload.category

        default:
            return state
    }
}

export default categoryReducer;
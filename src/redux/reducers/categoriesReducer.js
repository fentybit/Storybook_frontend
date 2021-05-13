function categoriesReducer(state = [], action) {
    switch (action.type) {
        case 'GET_USER_CATEGORIES':
            console.log('in categoryReducer ', action.payload)
            return action.payload

        case 'GET_EVENT':
            return action.payload.category


        default:
            return state
    }
}

export default categoriesReducer;
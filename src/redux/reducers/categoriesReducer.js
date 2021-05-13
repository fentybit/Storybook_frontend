function categoriesReducer(state = [], action) {
    switch (action.type) {
        case 'GET_USER_CATEGORIES':
            return action.payload

        default:
            return state
    }
}

export default categoriesReducer;
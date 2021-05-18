function imagesReducer(state = [], action) {
    switch (action.type) {
        case 'GET_USER_IMAGES':
            return action.payload

        default:
            return state
    }
}

export default imagesReducer;
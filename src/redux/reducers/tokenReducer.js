function tokenReducer(state = [], action) {
    switch (action.type) {
        case 'GET_USER':
            return action.payload.jwt

        default:
            return state;
    }
}

export default tokenReducer;
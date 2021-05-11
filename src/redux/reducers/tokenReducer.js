function tokenReducer(state = [], action) {
    switch (action.type) {
        case 'GET_USER':
            console.log('in tokenReducer ', action.payload.jwt)
            return action.payload.jwt

        default:
            return state;
    }
}

export default tokenReducer;
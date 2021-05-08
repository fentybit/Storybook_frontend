function userReducer(state = [], action) {
    switch (action.type) {
        case 'GET_USER':
            console.log('in reducer ', action.payload.user)
            return action.payload.user

        default:
            return state;
    }
}

export default userReducer;
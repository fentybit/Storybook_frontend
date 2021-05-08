function userReducer(state = { user: {}, token: '' }, action) {


    switch (action.type) {
        case 'SHOW_USER':
            // return action.data
            return {
                ...state,
                user: action.data.user,
                token: action.data.jwt
            }

        default:
            return state;
    }
}

export default userReducer;
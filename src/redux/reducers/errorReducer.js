function errorReducer(state = [], action) {

    switch (action.type) {
        case 'LOGIN_ERROR':
            return action.payload

        case 'SIGNUP_ERROR':
            return action.payload

        default:
            return state;
    }
}

export default errorReducer;
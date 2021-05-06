function userReducer(state = [], action) {
    switch (action.type) {
        case 'SHOW_USER':
            return action.user;

        default:
            return state;
    }
}

export default userReducer;
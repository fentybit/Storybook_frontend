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

// function userReducer(state = { user: {}, token: '' }, action) {
//     switch (action.type) {
//         case 'SHOW_USER':
//             console.log('in reducer ', action.payload.user)
//             console.log('in reducer ', action.payload.jwt)

//             return {
//                 ...state,
//                 user: action.payload.user,
//                 token: action.payload.jwt
//             }

//         default:
//             return state;
//     }
// }

// export default userReducer;
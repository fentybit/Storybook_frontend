function errorReducer(state = [], action) {
    // CREATE DIFFERENT REDUCER
    switch (action.type) {
        case 'ERROR':
            console.log('in errorReducer ', action.payload)
            return action.payload

        default:
            return state;
    }
}

export default errorReducer;
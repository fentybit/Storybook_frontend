function formReducer(state = { formInputs: { username: '', password: '', firstname: '', lastname: '' } }, action) {
    switch (action.type) {
        case 'RESET_FORM':
            console.log(state)
            return state

        default:
            return state
    }
}

export default formReducer;
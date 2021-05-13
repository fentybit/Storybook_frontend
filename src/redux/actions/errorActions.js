export const resetError = () => {
    return (dispatch) => {
        return dispatch({ type: 'RESET_ERROR', payload: '' })
    }
}
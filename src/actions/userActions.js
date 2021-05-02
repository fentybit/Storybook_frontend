export const fetchUser = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER' })
        fetch('http://localhost:3000/api/v1/users/1')
            .then(resp => resp.json())
            .then(respJSON => dispatch({ type: 'SHOW_USER', user: respJSON.data.attributes }))
    }
}
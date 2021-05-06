export const fetchUser = () => {
    return function (dispatch) {
        fetch('http://localhost:3000/api/v1/users/1')
            .then(resp => resp.json())
            .then(fetchUser => {
                dispatch({ type: 'SHOW_USER', user: fetchUser.data.attributes })
            })
    }
}
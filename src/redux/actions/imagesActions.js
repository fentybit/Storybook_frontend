export const fetchUserPhotos = () => {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')

            fetch('https://your-storybook.herokuapp.com/api/v1/images', {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => dispatch({ type: 'GET_USER_IMAGES', payload: data }))
        }
    }
}
export const fetchUserCategories = () => {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')

            fetch('https://your-storybook.herokuapp.com/api/v1/categories', {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data) {
                        dispatch({ type: 'GET_USER_CATEGORIES', payload: data });
                    }
                })
        }
    }
}
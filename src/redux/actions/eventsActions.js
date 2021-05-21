export const fetchEvent = (eventId) => {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')

            fetch(`https://your-storybook.herokuapp.com/api/v1/events/${eventId}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => dispatch({ type: 'GET_EVENT', payload: data }))
        }
    }
}

export const fetchUserEvents = () => {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')

            fetch('https://your-storybook.herokuapp.com/api/v1/events', {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => dispatch({ type: 'GET_USER_EVENTS', payload: data }))
        }
    }
}
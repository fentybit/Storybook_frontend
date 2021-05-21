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

export const fetchEditedEvent = (categoryId, eventId, history) => {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')

            fetch(`https://your-storybook.herokuapp.com/api/v1/events/${eventId}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (!data.error) {
                        dispatch({ type: 'GET_EVENT', payload: data })
                        history.push(`/events/${categoryId}/${eventId}/edit`)
                    }
                })
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
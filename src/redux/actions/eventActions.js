export const fetchEvent = (eventId) => {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')

            fetch(`http://localhost:3000/api/v1/events/${eventId}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => dispatch({ type: 'GET_EVENT', payload: data }))
        }
    }
}
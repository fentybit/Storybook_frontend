export const fetchEvent = (event_id) => {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')

            fetch(`http://localhost:3000/api/v1/events/${event_id}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => dispatch({ type: 'GET_EVENT', payload: data }))
        }
    }
}
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

// export const patchEvent = (entry, categoryId, eventId) => {
//     return (dispatch) => {
//         if (localStorage.getItem('token')) {
//             let token = localStorage.getItem('token')

//             if ((entry.category) && (entry.category !== 'Please enter Category')) {
//                 fetch(`http://localhost:3000/api/v1/events/${eventId}`, {
//                     method: 'PATCH',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         category: entry.category,
//                         vibe: entry.vibe,
//                         title: entry.title,
//                         date: entry.date,
//                         time: entry.time,
//                         location: entry.location,
//                         latitude: entry.latitude,
//                         longitude: entry.longitude,
//                         description: entry.description,
//                         image: entry.image.url
//                     })
//                 })
//                     .then(resp => resp.json())
//                     .then(data => {
//                         dispatch({ type: 'GET_EVENT', payload: data });
//                         // history.push(`/events/${categoryId}/${eventId}`)
//                     })
//             }

//         }
//     }
// }
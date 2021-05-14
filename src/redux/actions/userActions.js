export const fetchUser = (history) => {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')

            fetch('http://localhost:3000/api/v1/profile', {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
                .then(resp => {
                    if (resp.ok) {
                        return resp.json()
                    } else {
                        throw new Error(resp.statusText)
                    }
                })
                .then(data => {
                    if (data.jwt) {
                        localStorage.setItem("token", data.jwt);
                        dispatch({ type: 'GET_USER', payload: data });
                        history.push('/events')
                    }
                })
        }
    }
}

export const loginUser = (user, history) => {
    if ((!user.username) || (!user.password)) {
        return (dispatch) => {
            dispatch({ type: 'LOGIN_ERROR', payload: 'Please enter both Username and Password.' })
        }
    }

    return (dispatch) => {
        fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: user.username,
                    password: user.password
                }
            })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error(resp.statusText);
                }
            })
            .then(data => {
                if (!data.error) {
                    localStorage.setItem('token', data.jwt);
                    dispatch({ type: 'GET_USER', payload: data });
                    history.push('/events')
                } else {
                    dispatch({ type: 'LOGIN_BACKEND_ERROR', payload: data })
                }
            })
            .catch(error => {
                dispatch({ type: 'LOGIN_BACKEND_ERROR', payload: error });
            })
    }
}

export const signupUser = (user, history) => {
    if ((!user.username) || (!user.firstname) || (!user.lastname) || (!user.password)) {
        return (dispatch) => {
            dispatch({ type: 'SIGNUP_ERROR', payload: 'Please enter all fields.' })
        }
    }

    return (dispatch) => {
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    password: user.password
                }
            })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error(resp.statusText)
                }
            })
            .then(data => {
                console.log(data)
                if (!data.error) {
                    localStorage.setItem('token', data.jwt);
                    dispatch({ type: 'GET_USER', payload: data });
                    history.push('/events')
                } else {
                    dispatch({ type: 'SIGNUP_BACKEND_ERROR', payload: data })
                }
            })
            .catch(error => {
                dispatch({ type: 'SIGNUP_BACKEND_ERROR', payload: error });
            })
    }
}
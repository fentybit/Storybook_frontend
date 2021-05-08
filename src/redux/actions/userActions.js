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
                        dispatch({ type: 'SHOW_USER', data });
                        history.push('/profile')
                    }
                })
                .catch(err => dispatch({ type: 'ERROR', payload: '' }));
        }
    }
}

export const loginUser = (user, history) => {
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
                    dispatch({ type: 'SHOW_USER', data });
                    history.push('/profile')
                }
            })
            .catch(err => dispatch({ type: 'ERROR', payload: '' }));
    }
}

export const signupUser = (user, history) => {
    return (dispatch) => {
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
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
                    resp.json()
                } else {
                    throw new Error(resp.statusText);
                }
            })
            .then(data => {
                if (!data.error) {
                    localStorage.setItem('token', data.jwt);
                    dispatch({ type: 'SHOW_USER', data });
                    history.push('/profile')
                }
            })
    }
}
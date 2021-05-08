export const fetchUser = () => {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')

            fetch('http://localhost:3000/api/v1/profile', {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.jwt) {
                        localStorage.setItem("token", data.jwt);
                        dispatch({ type: 'SHOW_USER', data }, () => {
                            this.props.history.push('/profile')
                        })
                    }
                })
        }
    }
}

export const loginUser = (user) => {
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
            .then(resp => resp.json())
            .then(data => {
                if (!data.error) {
                    localStorage.setItem('token', data.jwt);
                    dispatch({ type: 'LOGIN_USER', data }, () => {
                        this.props.history.push('/profile')
                    })
                }
            })
    }
}
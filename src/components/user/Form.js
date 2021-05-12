import React, { Component } from 'react';

class Form extends Component {
    state = {
        username: '',
        password: '',
        firstname: '',
        lastname: ''
    }

    componentDidMount() {
        this.setState({
            username: '',
            password: '',
            firstname: '',
            lastname: ''
        })
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleSubmit(this.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type='text' name='username' placeholder='Username' onChange={this.handleOnChange} value={this.state.username} />

                    {(this.props.match.url === '/login')
                        ?
                        null
                        :
                        <>
                            <label htmlFor="firstname">Firstname</label>
                            <input type='text' name='firstname' placeholder='Firstname' onChange={this.handleOnChange} value={this.state.firstname} />
                            <label htmlFor="lastname">Lastname</label>
                            <input type='text' name='lastname' placeholder='Lastname' onChange={this.handleOnChange} value={this.state.lastname} />
                        </>
                    }

                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' placeholder='Password' onChange={this.handleOnChange} value={this.state.password} />
                    <input type='submit' value={(this.props.match.url === '/login') ? "Login" : "Sign Up"} />
                </form>
                {(this.props.error) ? <h6>{this.props.error}</h6> : null}
            </div>
        )
    }
}

export default Form;
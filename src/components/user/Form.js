import React, { Component } from 'react'

export default class Form extends Component {
    state = {
        username: '',
        password: '',
        firstname: '',
        lastname: ''
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
                    <input type='text' name='username' placeholder='Username' onChange={this.handleOnChange} value={this.state.username} />

                    {(this.props.match.url === '/login')
                        ?
                        null
                        :
                        <>
                            <input type='text' name='firstname' placeholder='Firstname' onChange={this.handleOnChange} value={this.state.firstname} />
                            <input type='text' name='lastname' placeholder='Lastname' onChange={this.handleOnChange} value={this.state.lastname} />
                        </>
                    }

                    <input type='password' name='password' placeholder='Password' onChange={this.handleOnChange} value={this.state.password} />
                    <input type='submit' value={(this.props.match.url === '/login') ? "Login" : "Sign Up"} />
                </form>
                {(this.state.message) ? <h6>{this.state.message}</h6> : null}
            </div>
        )
    }
}
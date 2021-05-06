import React, { Component } from 'react'

export default class Form extends Component {
    state = {
        username: '',
        password: '',
        firstname: '',
        lastname: ''
    }

    render() {
        return (
            <div>
                console.log(this.props.match.url)
                {/* Controlled Form for New User Sign Up */}
                <form onSubmit={this.handleSignup}>
                    <input type='text' name='username' placeholder='Username' onChange={this.handleOnChange} value={this.state.username} />
                    <input type='text' name='firstname' placeholder='Firstname' onChange={this.handleOnChange} value={this.state.firstname} />
                    <input type='text' name='lastname' placeholder='Lastname' onChange={this.handleOnChange} value={this.state.lastname} />
                    <input type='password' name='password' placeholder='Password' onChange={this.handleOnChange} value={this.state.password} />
                    <input type="submit" value="Sign Up" />
                </form>
                {(this.state.message) ? <h6>{this.state.message}</h6> : null}

                <hr />

                {/* Controlled Form for User Login */}
                <form onSubmit={this.handleLogin}>
                    <input type='text' name='username' placeholder='Username' onChange={this.handleOnChange} value={this.state.username} />
                    <input type='password' name='password' placeholder='Password' onChange={this.handleOnChange} value={this.state.password} />
                    <input type="submit" value="Login" />
                </form>
            </div>
        )
    }


}

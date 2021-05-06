import React, { Component } from 'react'

import './App.css';
// import NavigationContainer from './containers/NavigationContainer';
// import EventViewContainer from './containers/EventViewContainer';
// import DisplayContainer from './containers/DisplayContainer';

class App extends Component {
  state = {
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    message: null
  }

  handleLogin = () => {
    console.log('Loggin In')
  }

  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSignup = (event) => {
    event.preventDefault()

    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          password: this.state.password
        }
      })
    })
      .then(resp => resp.json())
      .then(data => this.setState({ message: data.error }))

    this.setState({ username: '', firstname: '', lastname: '', password: '' })
  }

  render() {
    return (
      <div className="App">

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

        {/* <NavigationContainer />
        <hr />
        <EventViewContainer />
        <hr />
        <DisplayContainer /> */}
      </div>
    );
  }
}

export default App;
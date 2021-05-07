import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import './App.css';
import Form from './components/user/Form';
import Welcome from './components/user/Welcome';
import NavBar from './components/user/NavBar';
import ProfileContainer from './containers/ProfileContainer';

class App extends Component {
  state = {
    user: {},
    token: ''
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')

      fetch('http://localhost:3000/api/v1/profile', {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          if (data.token) {
            localStorage.setItem("token", data.token);
            this.setState({
              user: data.user,
              token: data.token
            }, () => {
              this.props.history.push('/profile')
            })
          }
        })
    }
  }

  handleLogin = (user) => {
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
          this.setState({
            user: data.user,
            token: data.jwt
          }, () => {
            this.props.history.push('/profile')
          })
        }
      })
  }

  handleSignup = (user) => {
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
      .then(resp => resp.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem('token', data.jwt);
          this.setState({
            user: data.user,
            token: data.jwt
          }, () => {
            this.props.history.push('/profile')
          })
        }
      })
  }

  logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  renderForm = (routerProps) => {
    if (routerProps.location.pathname === '/login') {
      return <Form {...routerProps} formName='Login Form' handleSubmit={this.handleLogin} />
    } else if (routerProps.location.pathname === '/register') {
      return <Form {...routerProps} formName='Register Form' handleSubmit={this.handleSignup} />
    }
  }

  renderProfile = (routerProps) => {
    return <ProfileContainer token={this.state.token} user={this.state.user} />
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path='/login' render={this.renderForm} />
          <Route path='/logout' render={this.logout} />
          <Route path='/register' render={this.renderForm} />
          <Route path='/profile' render={this.renderProfile} />
          <Route path='/' exact render={() => <Welcome />} />
          <Route render={() => <p>Page not Found.</p>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
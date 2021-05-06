import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import './App.css';
import Form from './components/user/Form';
import Home from './components/user/Home';
// import NavigationContainer from './containers/NavigationContainer';
// import EventViewContainer from './containers/EventViewContainer';
// import DisplayContainer from './containers/DisplayContainer';

class App extends Component {
  state = {
    user: {},
    token: ''
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')

      fetch('http://localhost:4000/persist', {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
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
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem('token', data.token);
          this.setState({
            user: data.user,
            token: data.token
          }, () => {
            this.props.history.push('/profile')
          })
        }
      })
  }

  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSignup = (user) => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem('token', data.token);
          this.setState({
            user: data.user,
            token: data.token
          }, () => {
            this.props.history.push('/profile')
          })
        }
      })
  }

  renderForm = (routerProps) => {
    if (routerProps.location.pathname === '/login') {
      return <Form {...routerProps} formName='Login Form' handleSubmit={this.handleLogin} />
    } else if (routerProps.location.pathname === '/register') {
      return <Form {...routerProps} formName='Register Form' handleSubmit={this.handleSignup} />
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/login' render={this.renderForm} />
          <Route path='/register' render={this.renderForm} />
          <Route path='/profile' render={this.renderProfile} />
          <Route path='/' exact render={() => <Home />} />
          <Route render={() => <p>Page not Found.</p>} />
        </Switch>

        {/* <NavigationContainer />
        <hr />
        <EventViewContainer />
        <hr />
        <DisplayContainer /> */}
      </div>
    );
  }
}

export default withRouter(App);
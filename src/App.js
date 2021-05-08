import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { fetchUser, loginUser, signupUser } from './redux/actions/userActions';
import { connect } from 'react-redux';

import './App.css';
import Form from './components/user/Form';
import Welcome from './components/user/Welcome';
import NavBar from './components/user/NavBar';
import ProfileContainer from './containers/ProfileContainer';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.history)
  }

  handleLogin = (user) => {
    this.props.loginUser(user, this.props.history)
  }

  handleSignup = (user) => {
    this.props.signupUser(user, this.props.history)
  }

  logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  renderForm = (routerProps) => {
    if (routerProps.location.pathname === '/login') {
      return <Form {...routerProps} formName='Login Form' handleSubmit={this.handleLogin} />
    } else if (routerProps.location.pathname === '/signup') {
      return <Form {...routerProps} formName='SignUp Form' handleSubmit={this.handleSignup} />
    }
  }

  renderProfile = (routerProps) => {
    if (localStorage.getItem('token')) {
      return <ProfileContainer {...routerProps} token={this.props.token} user={this.props.user} />
    } else {
      window.location.href = '/'
    }
  }

  render() {
    return (
      <div div className="App" >
        <NavBar />
        <Switch>
          <Route path='/login' render={this.renderForm} />
          <Route path='/logout' render={this.logout} />
          <Route path='/signup' render={this.renderForm} />
          <Route path='/profile' render={this.renderProfile} />
          <Route path='/' exact render={() => <Welcome />} />
          <Route render={() => <Welcome />} />
        </Switch>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser, loginUser, signupUser })(App));
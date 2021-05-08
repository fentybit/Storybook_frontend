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
    } else if (routerProps.location.pathname === '/register') {
      return <Form {...routerProps} formName='Register Form' handleSubmit={this.handleSignup} />
    }
  }

  renderProfile = (routerProps) => {
    return <ProfileContainer token={this.props.user.user} user={this.props.user.token} />
  }

  render() {
    console.log(this.props.user)
    console.log(this.props.token)

    return (
      <div div className="App" >
        <NavBar />
        <Switch>
          <Route path='/login' render={this.renderForm} />
          <Route path='/logout' render={this.logout} />
          <Route path='/register' render={this.renderForm} />
          <Route path='/profile' render={this.renderProfile} />
          <Route path='/' exact render={() => <Welcome />} />
          <Route render={() => <p>Page not Found.</p>} />
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
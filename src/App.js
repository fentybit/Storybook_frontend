import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, loginUser, signupUser } from './redux/actions/userActions';
import { resetForm } from './redux/actions/formActions';

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
      return <Form {...routerProps} formName='Login Form' handleSubmit={this.handleLogin} error={this.props.error} />
    } else if (routerProps.location.pathname === '/signup') {
      return <Form {...routerProps} formName='SignUp Form' handleSubmit={this.handleSignup} error={this.props.error} />
    }
  }

  renderProfile = (routerProps) => {
    if (localStorage.getItem('token') && (this.props.user.length !== 0)) {
      return <ProfileContainer {...routerProps} token={this.props.token} user={this.props.user} />
    } else {
      return (
        <h6>Loading...</h6>
      )
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
          <Route path='/events' render={this.renderProfile} />

          <Route path='/' exact render={() => <Welcome />} />
          <Route render={() => <Welcome />} />
        </Switch>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
    formInputs: state.form,
    token: state.token,
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser, loginUser, signupUser, resetForm })(App));
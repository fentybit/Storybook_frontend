import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, loginUser, signupUser } from './redux/actions/userActions';
import { fetchUserCategories } from './redux/actions/categoriesActions';
import { fetchUserEvents } from './redux/actions/eventsActions';

import './App.css';
import Form from './components/user/Form';
import Welcome from './components/user/Welcome';
import NavBar from './components/user/NavBar';
import ProfileContainer from './containers/ProfileContainer';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.history);
    this.props.fetchUserCategories();
    this.props.fetchUserEvents();
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
      return <ProfileContainer {...routerProps} categories={this.props.categories} events={this.props.events} token={this.props.token} user={this.props.user} />
    } else {
      return (
        <h6>Loading...</h6>
      )
    }
  }

  render() {
    console.log(this.props.events)
    return (
      <div div className="App" >
        <NavBar />
        <Switch>
          <Route path='/login' component={this.renderForm} />
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
    categories: state.categories,
    error: state.error,
    events: state.events,
    token: state.token,
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser, loginUser, signupUser, fetchUserCategories, fetchUserEvents })(App));
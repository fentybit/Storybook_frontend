import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, loginUser, signupUser } from './redux/actions/userActions';
import { fetchUserCategories } from './redux/actions/categoriesActions';
import { fetchUserEvents } from './redux/actions/eventsActions';

import Form from './components/user/Form';
import Welcome from './components/user/Welcome';
import NavBar from './components/user/NavBar';
import ProfileContainer from './containers/ProfileContainer';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

function App(props) {
  useEffect(() => {
    props.fetchUser(props.history);
    props.fetchUserCategories();
    props.fetchUserEvents();
  }, [])

  const handleLogin = (user) => {
    props.loginUser(user, props.history)
  }

  const handleSignup = (user) => {
    props.signupUser(user, props.history)
  }

  const logout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  const renderForm = (routerProps) => {
    if (routerProps.location.pathname === '/login') {
      return <Form {...routerProps} formName='Login Form' handleSubmit={handleLogin} error={props.error} />
    } else if (routerProps.location.pathname === '/signup') {
      return <Form {...routerProps} formName='SignUp Form' handleSubmit={handleSignup} error={props.error} />
    }
  }

  const renderProfile = (routerProps) => {
    if (localStorage.getItem('token') && (props.user.length !== 0)) {
      return <ProfileContainer {...routerProps} categories={props.categories} events={props.events} token={props.token} user={props.user} />
    } else {
      return (
        <div>
          <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '80vh' }}>
            <Grid item xs={3}>
              <CircularProgress color="secondary" />
            </Grid>
          </Grid>
        </div>
      )
    }
  }

  return (
    <div>
      <NavBar />
      <Switch>
        <Route path='/login' render={renderForm} />
        <Route path='/logout' render={logout} />
        <Route path='/signup' render={renderForm} />
        <Route path='/events' render={renderProfile} />

        <Route path='/' exact render={() => <Welcome />} />
        <Route render={() => <Welcome />} />
      </Switch>
    </div>
  );
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
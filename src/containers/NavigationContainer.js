import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CategoriesContainer from './CategoriesContainer';
import EventViewContainer from './EventViewContainer';
import Form from '../components/eventview/Form';
import NavBar from '../components/navigation/NavBar';

class NavigationContainer extends Component {
    render() {
        return (
            <div>
                <h3>Navigation Container</h3>
                <NavBar />
                <Switch>
                    <Route path='/categories' render={() => <CategoriesContainer />} />
                    <Route path='/newevent' render={() => <Form />} />
                    <Route path='/' render={() => <EventViewContainer />} />
                </Switch>
            </div>
        )
    }
}

export default NavigationContainer;
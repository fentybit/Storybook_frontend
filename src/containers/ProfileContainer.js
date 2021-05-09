import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import NavBar from '../components/navigation/NavBar';
import CategoriesList from '../components/navigation/CategoriesList';
import EventViewList from '../components/navigation/EventViewList';
import Form from '../components/display/Form';

import EventViewContainer from '../components/navigation/EventViewList';
import DisplayContainer from './DisplayContainer';

export default class ProfileContainer extends Component {
    render() {
        // let { match } = this.props;
        return (
            <div>
                <h3>Container 1</h3>
                <NavBar user={this.props.user} />



                {/* <Route path='/categories' render={(routerProps) => <CategoriesList />} /> */}
                {/* <Route path='/eventview' render={(routerProps) => <EventViewList />} /> */}


                <hr />
                <EventViewContainer />


                <hr />
                <DisplayContainer />
                <Route path={`${this.props.match.url}/newentry`} render={() => <Form token={this.props.token} />} />
            </div>
        )
    }
}
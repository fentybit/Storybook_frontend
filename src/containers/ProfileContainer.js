import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import NavBar from '../components/navigation/NavBar';
import CategoriesList from '../components/navigation/CategoriesList';
import EventViewList from '../components/navigation/EventViewList';
import Form from '../components/display/Form';

import EventViewContainer from '../components/navigation/EventViewList';
import DisplayContainer from './DisplayContainer';

export default class ProfileContainer extends Component {
    state = {
        categories: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/categories', {
            headers: {
                'Authorization': `bearer ${this.props.token}`
            }
        })
            .then(resp => resp.json())
            .then(data => this.setState({ categories: data.map(category => category.name) }))
    }

    render() {

        return (
            <div>
                <h3>Container 1</h3>
                <NavBar user={this.props.user} categories={this.state.categories} />



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
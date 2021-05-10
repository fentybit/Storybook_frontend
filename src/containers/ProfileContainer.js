import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NavBar from '../components/navigation/NavBar';
import CategoriesList from '../components/navigation/CategoriesList';
import EventViewList from '../components/navigation/EventViewList';

import DisplayContainer from './DisplayContainer';

export default class ProfileContainer extends Component {
    // state = {
    //     user: []
    // }

    // componentDidMount() {
    //     if (localStorage.getItem('token')) {
    //         let token = localStorage.getItem('token')

    //         fetch('http://localhost:3000/api/v1/profile', {
    //             headers: {
    //                 'Authorization': `bearer ${token}`
    //             }
    //         })
    //             .then(resp => resp.json())
    //             .then(data => this.setState({ user: data.user }))
    //     }
    // }

    render() {
        // console.log(this.state.user)
        return (
            <div>
                <h3>Container 1</h3>
                <NavBar user={this.props.user} />

                {/* <Route path='/categories' render={(routerProps) => <CategoriesList />} /> */}
                {/* <Route path='/eventview' render={(routerProps) => <EventViewList />} /> */}


                <hr />
                <EventViewList url={this.props.match.url} />



                <hr />
                <DisplayContainer url={this.props.match.url} user={this.props.user} />

            </div>
        )
    }
}
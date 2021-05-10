import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NavBar from '../components/navigation/NavBar';
import CategoriesList from '../components/navigation/CategoriesList';
import EventViewList from '../components/navigation/EventViewList';

import DisplayContainer from './DisplayContainer';

export default class ProfileContainer extends Component {

    render() {
        console.log(this.props.user)

        return (
            <div>
                {
                    (this.props.user)
                        ?
                        <div>
                            <NavBar user={this.props.user} />




                            <hr />
                            <EventViewList url={this.props.match.url} />



                            <hr />
                            <DisplayContainer url={this.props.match.url} user={this.props.user} />

                        </div>
                        :

                        null
                }
            </div>
        )
    }
}
import React, { Component } from 'react'

import NavigationContainer from './NavigationContainer';
import EventViewContainer from './EventViewContainer';
import DisplayContainer from './DisplayContainer';

export default class ProfileContainer extends Component {
    render() {
        return (
            <div>
                <NavigationContainer />
                <hr />
                <EventViewContainer />
                <hr />
                <DisplayContainer />
            </div>
        )
    }
}
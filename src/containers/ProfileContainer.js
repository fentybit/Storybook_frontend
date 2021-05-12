import React, { Component } from 'react';

import NavBar from '../components/navigation/NavBar';
import EventViewList from '../components/eventview/EventViewList';
import DisplayContainer from './DisplayContainer';

export default class ProfileContainer extends Component {

    render() {
        return (
            <div>
                {
                    (this.props.user)
                        ?
                        <div>
                            <NavBar user={this.props.user} />

                            <hr />
                            <EventViewList url={this.props.match.url} user={this.props.user} token={this.props.token} />

                            <hr />
                            <DisplayContainer url={this.props.match.url} user={this.props.user} token={this.props.token} />
                        </div>

                        :

                        null
                }
            </div>
        )
    }
}
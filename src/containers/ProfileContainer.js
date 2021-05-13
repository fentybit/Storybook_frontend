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
                            <NavBar categories={this.props.categories} user={this.props.user} />

                            <hr />
                            <EventViewList categories={this.props.categories} events={this.props.events} token={this.props.token} url={this.props.match.url} user={this.props.user} />

                            <hr />
                            <DisplayContainer categories={this.props.categories} events={this.props.events} token={this.props.token} url={this.props.match.url} user={this.props.user} />
                        </div>

                        :

                        null
                }
            </div>
        )
    }
}
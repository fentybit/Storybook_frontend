import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Form from '../components/display/Form';
import Summary from '../components/display/Summary';
import EventDisplay from '../components/display/EventDisplay';

class DisplayContainer extends Component {
    render() {
        return (
            <div>
                <h3>Container 3</h3>
                <Switch>
                    <Route path={`${this.props.url}/newentry`} render={(routerProps) => <Form {...routerProps} user={this.props.user} token={this.props.token} />} />

                    <Route path={`${this.props.url}/:eventId`} render={(routerProps) => <EventDisplay {...routerProps} user={this.props.user} token={this.props.token} />} />

                    <Route exact path={this.props.url} render={() => <Summary user={this.props.user} />} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(DisplayContainer);
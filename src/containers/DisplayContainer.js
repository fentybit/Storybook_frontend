import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Form from '../components/display/Form';
import CategorySummary from '../components/display/CategorySummary';
import Summary from '../components/display/Summary';
import EventDisplay from '../components/display/EventDisplay';

class DisplayContainer extends Component {
    render() {
        return (
            <div>
                <h3>Container 3</h3>
                <Switch>
                    {/* working */}
                    <Route path={`${this.props.url}/newentry`} render={() => <Form categories={this.props.categories} history={this.props.history} user={this.props.user} token={this.props.token} />} />

                    <Route path={`${this.props.url}/:categoryId/:eventId`} render={(routerProps) => <EventDisplay {...routerProps} user={this.props.user} token={this.props.token} />} />

                    <Route path={`${this.props.url}/:categoryId`} render={(routerProps) => <CategorySummary {...routerProps} user={this.props.user} token={this.props.token} />} />

                    {/* working  */}
                    <Route exact path={this.props.url} render={() => <Summary categories={this.props.categories} events={this.props.events} user={this.props.user} />} />

                    <Route render={() => <Summary categories={this.props.categories} events={this.props.events} user={this.props.user} />} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(DisplayContainer);
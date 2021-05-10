import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from '../components/display/Form';
import Summary from '../components/display/Summary';

class DisplayContainer extends Component {

    render() {
        return (
            <div>
                <h3>Container 3</h3>
                <Route exact path={this.props.url} render={() => <Summary user={this.props.user} />} />
                <Route path={`${this.props.url}/newentry`} render={() => <Form token={this.props.token} />} />
            </div>
        )
    }
}

export default DisplayContainer;
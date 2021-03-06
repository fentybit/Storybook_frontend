import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import EditForm from '../components/display/EditForm';
import Form from '../components/display/Form';
import CategorySummary from '../components/display/CategorySummary';
import Summary from '../components/display/Summary';
import EventDisplay from '../components/display/EventDisplay';

function DisplayContainer(props) {
    const { categories, events, token, url, user } = props;

    return (
        <div>
            <Switch>
                <Route path={`${url}/calendar/:eventId`} render={(routerProps) => <EventDisplay {...routerProps} categories={categories} events={events} token={token} user={user} />} />

                <Route path={`${url}/calendar`} render={() => <Summary categories={categories} user={user} />} />

                <Route path={`${url}/photos/:eventId`} render={(routerProps) => <EventDisplay {...routerProps} categories={categories} events={events} token={token} user={user} />} />

                <Route path={`${url}/photos`} render={(routerProps) => <Summary {...routerProps} categories={categories} events={categories} />} />

                <Route path={`${url}/map/:eventId`} render={(routerProps) => <EventDisplay {...routerProps} categories={categories} events={events} token={token} user={user} />} />

                <Route path={`${url}/map`} render={() => <Summary categories={categories} user={user} />} />

                <Route path={`${url}/newentry`} render={() => <Form categories={categories} history={props.history} token={token} user={user} />} />

                <Route path={`${url}/:categoryId/:eventId/edit`} render={(routerProps) => <EditForm {...routerProps} categories={categories} token={token} />} />

                <Route path={`${url}/:categoryId/:eventId`} render={(routerProps) => <EventDisplay {...routerProps} categories={categories} events={events} token={token} user={user} />} />

                <Route path={`${url}/:categoryId`} render={(routerProps) => <CategorySummary {...routerProps} events={events} token={token} />} />

                <Route exact path={url} render={() => <Summary categories={categories} user={user} />} />

                <Route render={() => <Summary categories={categories} user={user} />} />
            </Switch>
        </div>
    )
}

export default withRouter(DisplayContainer);
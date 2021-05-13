import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import CalendarView from './CalendarView';
import MapView from './MapView';


function EventViewList({ categories, events, token, url, user }) {
    // not stateless
    const [value, onChange] = useState(new Date());

    return (
        <div align="center">
            <h3>Container 2</h3>
            <Switch>
                {/* working */}
                <Route path={`${url}/newentry`} render={() => <Calendar onChange={onChange} value={value} view='month' />} />

                <Route path={`${url}/:categoryId/:eventId`} render={(routerProps) => <CalendarView {...routerProps} categories={categories} events={events} token={token} user={user} />} />

                <Route path={`${url}/:categoryId`} render={(routerProps) => <CalendarView {...routerProps} categories={categories} events={events} token={token} user={user} />} />

                {/* working */}
                <Route path={url} render={() => <Calendar onChange={onChange} value={value} view='month' />} />


                {/* <Route path={`${url}/map`} render={() => <MapView />} /> */}
            </Switch>
        </div>
    )

}

export default EventViewList;
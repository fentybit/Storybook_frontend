import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import CalendarView from './CalendarView';

import MapView from './MapView';

function EventViewList({ url, user, token }) {
    // not stateless
    const [value, onChange] = useState(new Date());

    return (
        <div align="center">
            <h3>Container 2</h3>
            <Switch>

                <Route exact path={url} render={() => <Calendar onChange={onChange} value={value} view='month' />} />
                <Route path={`/categories/:category_name`} render={(routerProps) => <CalendarView {...routerProps} user={user} token={token} />} />

                {/* <Route path={`${url}/map`} render={() => <MapView />} /> */}

                {/* <Route path={`${url}/newentry`} render={() => <Calendar onChange={onChange} value={value} showNeighboringMonth='true' maxDetail='month' />} /> */}

            </Switch>
        </div>
    )

}

export default EventViewList;
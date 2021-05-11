import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import MapView from './MapView';

function EventViewList({ url }) {
    // not stateless
    const [value, onChange] = useState(new Date());

    console.log(value)
    return (
        <div align="center">
            <h3>Container 2</h3>
            <Switch>
                <Route exact path={url} render={() => <Calendar onChange={onChange} value={value} view='month' />} />

                {/* <Route path={`${url}/map`} render={() => <MapView />} /> */}

                {/* <Route path={`${url}/newentry`} render={() => <Calendar onChange={onChange} value={value} showNeighboringMonth='true' maxDetail='month' />} /> */}

            </Switch>
        </div>
    )

}

export default EventViewList;
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function EventViewList({ url }) {
    const [value, onChange] = useState(new Date());

    console.log(value)
    return (
        <div align="center">
            <h3>Container 2</h3>
            <Switch>
                <Route exact path={url} render={() => <Calendar onChange={onChange} value={value} />} />
                <Route path={`${url}/newentry`} render={() => <Calendar onChange={onChange} value={value} />} />
            </Switch>
        </div>
    )

}

export default EventViewList;
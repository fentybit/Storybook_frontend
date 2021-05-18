import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';


import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { format } from 'date-fns'

import CalendarView from './CalendarView';
import PhotosView from './PhotosView';

function EventViewList({ categories, events, props, token, url, user }) {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    const dates = [...new Set(events.map(event => event.date))];
    const filteredAndSortedDates = dates.filter(date => date !== null).sort();
    const selectedDatesArray = filteredAndSortedDates.map(date => {
        let eventDate = date.split('-');
        return new Date(parseInt(eventDate[0]), parseInt(eventDate[1] - 1), parseInt(eventDate[2]));
    })

    const renderSelectedEventDate = (date) => {
        let selectedDate = format(date, 'YYYY-MM-DD')
        let findEvent = events.find(event => event.date === selectedDate)

        if (findEvent) {
            props.history.push(`/events/calendar/${findEvent.id}`)
        } else {
            props.history.push('/events/calendar')
        }
    }

    return (
        <div div align="center">
            <h3>Container 2</h3>
            <Switch>
                {/* working */}
                <Route path={`${url}/calendar/:eventId`} render={() => <InfiniteCalendar Component={withMultipleDates(Calendar)} interpolateSelection={defaultMultipleDateInterpolation} onSelect={date => renderSelectedEventDate(date)} selected={selectedDatesArray} theme={{
                    selectionColor: date => {
                        return (date) ? '#559FFF' : '#559FFF';
                    }
                }} />} />

                {/* working */}
                <Route path={`${url}/calendar`} render={() => <InfiniteCalendar Component={withMultipleDates(Calendar)} interpolateSelection={defaultMultipleDateInterpolation} onSelect={date => renderSelectedEventDate(date)} selected={selectedDatesArray} theme={{
                    selectionColor: date => {
                        return (date) ? '#559FFF' : '#559FFF';
                    }
                }} />} />

                {/* working */}
                <Route path={`${url}/newentry`} render={() => <InfiniteCalendar width={400} height={600} selected={today} disabledDays={[0, 6]} minDate={lastWeek} />} />

                <Route path={`${url}/photos/:eventId`} render={() => <PhotosView />} />

                {/* working */}
                <Route path={`${url}/photos`} render={() => <PhotosView />} />

                <Route path={`${url}/:categoryId/:eventId`} render={(routerProps) => <CalendarView {...routerProps} categories={categories} events={events} token={token} user={user} />} />

                {/* working */}
                <Route path={`${url}/:categoryId`} render={(routerProps) => <CalendarView {...routerProps} categories={categories} events={events} token={token} user={user} />} />

                {/* working */}
                <Route path={url} render={() => <InfiniteCalendar width={400} height={600} selected={today} disabledDays={[0, 6]} minDate={lastWeek} />} />


                {/* <Route path={`${url}/map`} render={() => <MapView />} /> */}
            </Switch>
        </div>
    )

}

export default EventViewList;
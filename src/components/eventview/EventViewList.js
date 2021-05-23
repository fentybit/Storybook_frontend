import React from 'react';
import { Switch, Route } from 'react-router-dom';

import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { format } from 'date-fns'

import CalendarView from './CalendarView';
import MapView from './MapView';
import PhotosView from './PhotosView';

export default function EventViewList({ categories, events, props, token, url, user }) {
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
            <Switch>
                <Route path={`${url}/calendar/:eventId`} render={() => <InfiniteCalendar Component={withMultipleDates(Calendar)} interpolateSelection={defaultMultipleDateInterpolation} onSelect={date => renderSelectedEventDate(date)} selected={selectedDatesArray} theme={{
                    selectionColor: date => {
                        return (date) ? '#03a9f4' : '#03a9f4';
                    },
                    textColor: {
                        default: '#333',
                        active: '#FFF'
                    },
                    weekdayColor: '#03a9f4',
                    headerColor: '#0288d1',
                    floatingNav: {
                        background: '#0277bd',
                        color: '#FFF',
                        chevron: '#e91e63'
                    }
                }} />} />

                <Route path={`${url}/calendar`} render={() => <InfiniteCalendar Component={withMultipleDates(Calendar)} interpolateSelection={defaultMultipleDateInterpolation} onSelect={date => renderSelectedEventDate(date)} selected={selectedDatesArray} theme={{
                    selectionColor: date => {
                        return (date) ? '#03a9f4' : '#03a9f4';
                    },
                    textColor: {
                        default: '#333',
                        active: '#FFF'
                    },
                    weekdayColor: '#03a9f4',
                    headerColor: '#0288d1',
                    floatingNav: {
                        background: '#0277bd',
                        color: '#FFF',
                        chevron: '#e91e63'
                    }
                }} />} />

                <Route path={`${url}/map/:eventId`} render={(routerProps) => <MapView {...routerProps} events={events} />} />

                <Route path={`${url}/map`} render={(routerProps) => <MapView {...routerProps} events={events} />} />

                <Route path={`${url}/newentry`} render={() => <InfiniteCalendar width={400} height={600} selected={today} theme={{
                    selectionColor: '#e91e63',
                    textColor: {
                        default: '#333',
                        active: '#FFF'
                    },
                    weekdayColor: '#03a9f4',
                    headerColor: '#0288d1',
                    floatingNav: {
                        background: '#0277bd',
                        color: '#FFF',
                        chevron: '#e91e63'
                    }
                }} />} />

                <Route path={`${url}/photos/:eventId`} render={() => <PhotosView />} />

                <Route path={`${url}/photos`} render={() => <PhotosView />} />

                <Route path={`${url}/:categoryId/:eventId/edit`} render={(routerProps) => <CalendarView {...routerProps} categories={categories} events={events} token={token} user={user} />} />

                <Route path={`${url}/:categoryId/:eventId`} render={(routerProps) => <CalendarView {...routerProps} categories={categories} events={events} token={token} user={user} />} />

                <Route path={`${url}/:categoryId`} render={(routerProps) => <CalendarView {...routerProps} categories={categories} events={events} token={token} user={user} />} />

                {/* here */}
                <Route path={url} render={() => <InfiniteCalendar width={400} height={600} selected={today} theme={{
                    selectionColor: '#e91e63',
                    textColor: {
                        default: '#333',
                        active: '#FFF'
                    },
                    weekdayColor: '#03a9f4',
                    headerColor: '#0288d1',
                    floatingNav: {
                        background: '#0277bd',
                        color: '#FFF',
                        chevron: '#e91e63'
                    }
                }} />} />
            </Switch>
        </div>
    )
}
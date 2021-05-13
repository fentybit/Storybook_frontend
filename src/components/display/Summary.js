import React from 'react';

export default function Summary({ categories, events, user }) {
    const places = (events) ? events.filter(event => event.location !== '') : null

    return (
        <div>
            <h5>All Entries</h5>
            <p>Entries | {events.length}</p>
            <p>Categories | {categories.length}</p>
            <p>Places | {places.length}</p>
            <p>Photos | TBD</p>
        </div>
    )
}
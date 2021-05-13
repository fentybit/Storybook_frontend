import React from 'react';

export default function CategorySummary({ user }) {
    const places = user.events.map(event => event.location)

    return (
        <div>
            <h5>Category Entries</h5>
            {/* <p>Entries | {user.events.length}</p>
            <p>Categories | {user.categories.length}</p>
            <p>Places | {places.length}</p>
            <p>Photos | TBD</p> */}
        </div>
    )
}
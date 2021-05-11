import React from 'react';

export default function Summary({ user }) {
    const places = user.events.map(event => event.location)
    console.log(user)

    return (
        <div>
            <h5>All Entries</h5>
            <p>Entries | {user.events.length}</p>
            <p>Categories | {user.categories.length}</p>
            <p>Places | {places.length}</p>
            <p>Photos | TBD</p>
        </div>
    )
}
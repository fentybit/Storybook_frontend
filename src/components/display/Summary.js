import React from 'react';

export default function Summary({ user }) {
    const places = user.events.map(event => event.location)
    console.log(user)

    return (
        <div>
            <p>All Entries</p>
            <p>Entries | {user.events.length}</p>
            <p>Categories | {user.categories.length}</p>
            <p>Places | {places.length}</p>
            <p>Photos | TBD</p>
        </div>
    )
}
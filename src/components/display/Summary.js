import React from 'react';

export default function Summary({ user }) {
    console.log(user)
    return (
        <div>
            <p>All Entries</p>
            {/* <p>Entries | {user.events.length}</p>
            <p>Categories | {user.categories.length}</p>
            <p>Places | {user.events.length}</p>
            <p>Photos | {user.events.length}</p> */}
        </div>
    )
}
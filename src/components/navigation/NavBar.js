import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
    return (
        <div>
            <h5>Hello, {user.fullname}</h5>
            <p>Categories Link here</p>

            <NavLink to='/events/newentry'>New Entry</NavLink>

            <p>Event View Link here</p>
        </div>
    )
}

export default NavBar;
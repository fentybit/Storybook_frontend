import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
    return (
        <div>
            <h3>Hello, {user.fullname}</h3>
            Categories Link here
            <hr />
            <NavLink to='/events/newentry'>New Entry</NavLink>
            <hr />
            Event View Link here
        </div>
    )
}

export default NavBar;
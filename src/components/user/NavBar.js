import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <NavLink to='/'>Home</NavLink> | <NavLink to='/login'>Login</NavLink> | <NavLink to='/register'>Sign Up</NavLink> | <NavLink to='/profile'>Profile</NavLink>
        </div>
    )
}

export default NavBar;
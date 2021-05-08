import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            { localStorage.getItem('token')
                ?
                <>
                    <NavLink to='/events'>Home</NavLink> | <NavLink to='/logout'>Logout</NavLink>
                </>
                :
                <>
                    <NavLink to='/login'>Login</NavLink> | <NavLink to='/signup'>Sign Up</NavLink>
                </>
            }
            <hr />
        </div>
    )
}

export default NavBar;
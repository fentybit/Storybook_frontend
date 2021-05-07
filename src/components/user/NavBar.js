import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            { localStorage.getItem('token')
                ?
                <NavLink to='/logout'>Logout</NavLink>
                :
                <>
                    <NavLink to='/login'>Login</NavLink> | <NavLink to='/register'>Sign Up</NavLink>
                </>
            }
            <hr />
        </div>
    )
}

export default NavBar;
import React from 'react';
import { NavLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import MinimizeIcon from '@material-ui/icons/Minimize';

const NavBar = () => {
    return (
        <div>
            { localStorage.getItem('token')
                ?
                <>
                    <Link component="button" variant="body2" to='/events'>Home</Link>
                    <MinimizeIcon />
                    <Link component="button" variant="body2" to='/logout'>Logout</Link>
                </>
                :
                <>
                    <NavLink to='/login'>
                        <Link component="button" variant="body2">Login</Link>
                    </NavLink>

                    <MinimizeIcon color="disabled" fontSize="medium" />

                    <NavLink to='/signup'>
                        <Link component="button" variant="body2">Sign Up</Link>
                    </NavLink>
                </>
            }
            <hr />
        </div>
    )
}

export default NavBar;
import React from 'react';
import { NavLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import MinimizeIcon from '@material-ui/icons/Minimize';
import Typography from '@material-ui/core/Typography';
import '@fontsource/roboto';

const NavBar = () => {
    return (
        <div>
            { localStorage.getItem('token')
                ?
                <>
                    <h2>Storybook</h2>
                    <NavLink to='/events'>
                        <Link component="button" variant="body2">Home</Link>
                    </NavLink>

                    <MinimizeIcon color="disabled" fontSize="medium" />

                    <NavLink to='/logout'>
                        <Link component="button" variant="body2">Logout</Link>
                    </NavLink>
                </>
                :
                <>
                    <NavLink to='/'>
                        <Link component="button" variant="body2">Welcome</Link>
                    </NavLink>

                    <MinimizeIcon color="disabled" fontSize="medium" />

                    <NavLink to='/login'>
                        <Link component="button" variant="body2">Log In</Link>
                    </NavLink>

                    <MinimizeIcon color="disabled" fontSize="medium" />

                    <NavLink to='/signup'>
                        <Link component="button" variant="body2">Sign Up</Link>
                    </NavLink>
                </>
            }
        </div>
    )
}

export default NavBar;
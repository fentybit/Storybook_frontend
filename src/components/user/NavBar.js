import React from 'react';
import { NavLink } from 'react-router-dom';

import CollectionsBookmarkTwoToneIcon from '@material-ui/icons/CollectionsBookmarkTwoTone';
import Link from '@material-ui/core/Link';
import MinimizeIcon from '@material-ui/icons/Minimize';
import Box from '@material-ui/core/Box';

const NavBar = () => {
    return (
        <div align='center'>
            { localStorage.getItem('token')
                ?
                <Box fontFamily="Monospace" fontSize="h4.fontSize" fontWeight="fontWeightBold" letterSpacing={10} margin='15px' textAlign='left'>
                    storybook
                    <span style={{ color: '#e91e63' }}>.</span>
                    <CollectionsBookmarkTwoToneIcon fontSize="small" />
                </Box>

                :
                <>
                    <NavLink to='/'>
                        <Link component="button" style={{ color: '#01579b' }} variant="body2">Welcome</Link>
                    </NavLink>

                    <MinimizeIcon color="disabled" fontSize="medium" />

                    <NavLink to='/login'>
                        <Link component="button" style={{ color: '#01579b' }} variant="body2">Log In</Link>
                    </NavLink>

                    <MinimizeIcon color="disabled" fontSize="medium" />

                    <NavLink to='/signup'>
                        <Link component="button" style={{ color: '#01579b' }} variant="body2">Sign Up</Link>
                    </NavLink>
                </>
            }
        </div>
    )
}

export default NavBar;
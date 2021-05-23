import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { fetchUserCategories } from '../../redux/actions/categoriesActions';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import UILink from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function NavBar(props) {
    const classes = useStyles();

    useEffect(() => {
        props.fetchUserCategories();
    }, [])

    const renderCategoriesLink = () => {
        if (props.categories.length > 0) {
            let userCategories = props.categories.sort(function (a, b) {
                let nameA = a.name.toUpperCase()
                let nameB = b.name.toUpperCase()

                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0
            })

            return userCategories.map(category => {
                return (
                    <ListItem button>
                        <Link key={category.id} to={`/events/${category.id}`}>
                            <UILink component="button" style={{ color: "#01579b" }} variant="body2">
                                <ListItemText primary={category.name} />
                            </UILink>
                        </Link>
                    </ListItem>
                )
            })
        }
    }

    return (
        <div className={classes.root} >
            <h4>Hello, {props.user.fullname}</h4>

            <Divider />

            <Grid style={{ position: 'relative' }}>
                <List component="nav">
                    <ListItem button>
                        <NavLink to='/events'>
                            <UILink component="button" style={{ color: "#01579b" }} variant="body2"><ListItemText primary="Home" /></UILink>
                        </NavLink>
                    </ListItem>

                    <Divider />

                    {(props.categories.length === 0) ? <h5>Write your first journal entry!</h5> : <h5>All Events</h5>}

                    {renderCategoriesLink()}

                    <Divider />

                    <ListItem button>
                        <NavLink to='/events/newentry'>
                            <UILink component="button" style={{ color: "#01579b" }} variant="body2">
                                <ListItemText primary="New Entry" />
                            </UILink>
                        </NavLink>
                    </ListItem>

                    <Divider />

                    <h5>View</h5>

                    <ListItem button>
                        <NavLink to='/events/calendar'>
                            <UILink component="button" style={{ color: "#01579b" }} variant="body2"><ListItemText primary="Calendar" /></UILink>
                        </NavLink>
                    </ListItem>

                    <ListItem button>
                        <NavLink to='/events/map'>
                            <UILink component="button" style={{ color: "#01579b" }} variant="body2"><ListItemText primary="Map" /></UILink>
                        </NavLink>
                    </ListItem>

                    <ListItem button>
                        <NavLink to='/events/photos'>
                            <UILink component="button" style={{ color: "#01579b" }} variant="body2"><ListItemText primary="Photos" /></UILink>
                        </NavLink>
                    </ListItem>

                    <br />
                    <br />
                    <Divider />

                    <ListItem button>
                        <NavLink to='/logout'>
                            <UILink component="button" style={{ color: "#01579b" }} variant="body2"><ListItemText primary="Logout" /></UILink>
                        </NavLink>
                    </ListItem>
                </List>
            </Grid>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps, { fetchUserCategories })(NavBar);
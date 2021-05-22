import React from 'react';
import NavBar from '../components/navigation/NavBar';
import EventViewList from '../components/eventview/EventViewList';
import DisplayContainer from './DisplayContainer';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '10px',
    },
    paper: {
        height: '100%',
        justify: "flex-end",
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

export default function ProfileContainer(props) {
    const classes = useStyles();
    const { categories, events, match, token, user } = props;

    return (
        <div>
            {
                (user)
                    ?
                    <div className={classes.root} >
                        <Grid container spacing={1} alignItems="stretch">
                            <Grid item xs={12} md={2}>
                                <Paper className={classes.paper} elevation={3}>
                                    <NavBar categories={categories} user={user} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Paper className={classes.paper} elevation={3}>
                                    <EventViewList categories={categories} events={events} props={props} token={token} url={match.url} user={user} />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md>
                                <Paper className={classes.paper} elevation={3}>
                                    <DisplayContainer categories={categories} events={events} token={token} url={match.url} user={user} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    null
            }
        </div>
    )
}
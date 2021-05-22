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
        margin: '10px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
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
                    <div className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <Paper className={classes.paper}>
                                    <NavBar categories={categories} user={user} />
                                </Paper>
                            </Grid>
                            <Grid item xs={5}>
                                <Paper className={classes.paper}>
                                    <EventViewList categories={categories} events={events} props={props} token={token} url={match.url} user={user} />
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className={classes.paper}>
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
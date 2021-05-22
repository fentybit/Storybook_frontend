import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchUserCategories } from '../../redux/actions/categoriesActions';
import { fetchUserEvents } from '../../redux/actions/eventsActions';
import { fetchUserPhotos } from '../../redux/actions/imagesActions';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

function Summary(props) {
    const classes = useStyles();

    useEffect(() => {
        props.fetchUserCategories();
        props.fetchUserEvents();
        props.fetchUserPhotos();
    }, [])

    const places = (props.events) ? props.events.filter(event => event.location !== '') : null

    return (
        <div>
            { (props.events)
                ?
                <>
                    <h5>All Entries</h5>
                    <p>Entries | {props.events.length}</p>
                    <p>Categories | {props.categories.length}</p>
                    <p>Places | {places.length}</p>
                    <p>Photos | {props.images.length}</p>
                </>
                :
                <div className={classes.root}>
                    <CircularProgress color="secondary" />
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
        events: state.events,
        images: state.images
    }
}

export default connect(mapStateToProps, { fetchUserEvents, fetchUserPhotos, fetchUserCategories })(Summary);
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchUserCategories } from '../../redux/actions/categoriesActions';
import { fetchUserEvents } from '../../redux/actions/eventsActions';
import { fetchUserPhotos } from '../../redux/actions/imagesActions';

import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

function Summary(props) {
    useEffect(() => {
        props.fetchUserCategories();
        props.fetchUserEvents();
        props.fetchUserPhotos();
    }, [])

    const places = (props.events) ? props.events.filter(event => event.location !== '') : null

    return (
        <div>
            {
                (props.events)
                    ?

                    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '80vh' }} textAlign="center">
                        <Grid item xs={3}>
                            <h4>All Entries</h4>
                            <Divider />
                            <p>Entries | {props.events.length}</p>
                            <p>Categories | {props.categories.length}</p>
                            <p>Places | {places.length}</p>
                            <p>Photos | {props.images.length}</p>
                        </Grid>
                    </Grid>

                    :

                    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '80vh' }} textAlign="center">
                        <Grid item xs={3}>
                            <CircularProgress color="secondary" />
                        </Grid>
                    </Grid>
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
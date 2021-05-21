import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchUserCategories } from '../../redux/actions/categoriesActions';
import { fetchUserEvents } from '../../redux/actions/eventsActions';
import { fetchUserPhotos } from '../../redux/actions/imagesActions';

function Summary(props) {
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
                <h5>Loading...</h5>
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
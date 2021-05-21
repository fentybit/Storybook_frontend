import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchUserCategories } from '../../redux/actions/categoriesActions';
import { fetchUserEvents } from '../../redux/actions/eventsActions';
import { fetchUserPhotos } from '../../redux/actions/imagesActions';

function CategorySummary(props) {
    const categoryId = props.match.params.categoryId;

    useEffect(() => {
        props.fetchUserCategories();
        props.fetchUserEvents();
        props.fetchUserPhotos();
    }, [])


    const categoryEvents = () => {
        if (categoryId && props.events) {
            return props.events.filter(event => parseInt(event.category.id) === parseInt(categoryId));
        }
    }

    const categoryName = () => {
        if (categoryId && props.events) {
            const events = props.events.filter(event => parseInt(event.category.id) === parseInt(categoryId));

            return events[0].category.name
        }
    }

    const categoryPhotos = () => {
        return categoryEvents().filter(event => event.image.length !== 0)
    }

    const categoryPlaces = () => {
        return categoryEvents().filter(event => event.location !== '')
    }

    return (
        <div>
            { (props.events && props.categories)
                ?
                <>
                    <h5>{categoryName()}</h5>
                    <p>Entries | {categoryEvents().length}</p>
                    <p>Places | {categoryPlaces().length}</p>
                    <p>Photos | {categoryPhotos().length}</p>
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

export default connect(mapStateToProps, { fetchUserEvents, fetchUserPhotos, fetchUserCategories })(CategorySummary);
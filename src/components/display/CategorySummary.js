import React from 'react';

export default function CategorySummary({ events, match }) {
    const categoryId = match.params.categoryId;

    const categoryEvents = () => {
        if (events) {
            return events.filter(event => event.category.id == categoryId);
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
            { (categoryEvents())
                ?
                <>
                    <h5>{categoryEvents()[0].category.name}</h5>
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
import React from 'react';

export default function CategorySummary({ categories, events, match, user }) {
    const renderCategoryEvents = () => {
        if (events) {
            const categoryId = match.params.categoryId;

            return events.filter(event => event.category.id == categoryId);
        }
    }

    console.log(renderCategoryEvents())

    return (
        <div>
            { (events)
                ?
                <>
                    <h5>Category Summary</h5>
                    <p>Categories | TBD</p>
                    <p>Entries | {events.length}</p>
                    <p>Places | TBD</p>
                    <p>Photos | TBD</p>
                </>
                :
                <h5>Loading...</h5>
            }
        </div>
    )
}
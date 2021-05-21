import React from 'react';
import { connect } from 'react-redux';

import { fetchEditedEvent } from '../../redux/actions/eventsActions';

function EventDisplay(props) {
    const renderEvent = () => {
        if (props.events) {
            const eventId = props.match.params.eventId;

            return props.events.filter(event => parseInt(event.id) === parseInt(eventId))[0];
        }
    }

    const handleClick = () => {
        const categoryId = props.match.params.categoryId
        const eventId = props.match.params.eventId

        props.fetchEditedEvent(categoryId, eventId, props.history)
    }

    return (
        <div>
            <h5>Event Display</h5>
            {(renderEvent())
                ?
                <>
                    <h5>{renderEvent().category.name}</h5>
                    <p>{renderEvent().title}</p>
                    <p>{renderEvent().vibe}</p>
                    <p>{renderEvent().date}</p>
                    <p>{renderEvent().time_strftime}</p>
                    <p>{renderEvent().location}</p>
                    <p>{renderEvent().description}</p>

                    { (renderEvent().image) ? <img key={renderEvent().image.id} src={renderEvent().image.url} alt={"chosen"} style={{ height: '200px' }} /> : null}
                </>
                :
                <h5>Loading...</h5>
            }
            <br />
            <button onClick={handleClick}>Edit</button>
        </div>
    )
}

export default connect(null, { fetchEditedEvent })(EventDisplay);
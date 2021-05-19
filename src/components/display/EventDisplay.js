import React, { Component } from 'react';

class EventDisplay extends Component {
    renderEvent = () => {
        if (this.props.events) {
            const eventId = this.props.match.params.eventId;

            return this.props.events.filter(event => event.id == eventId)[0];
        }
    }

    render() {
        const displayEvent = this.renderEvent();
        console.log(this.props)
        return (
            <div>
                <h5>Event Display</h5>
                {(displayEvent)
                    ?
                    <>
                        {/* <p>{event.category.name}</p> */}
                        <p>{displayEvent.title}</p>
                        <p>{displayEvent.vibe}</p>
                        <p>{displayEvent.date}</p>
                        <p>{displayEvent.time}</p>
                        <p>{displayEvent.location}</p>
                        <p>{displayEvent.description}</p>
                        { (displayEvent.images) ? displayEvent.images.map(image => <img src={image.url} style={{ height: '200px' }} />) : null}
                    </>
                    :
                    <h5>Loading...</h5>
                }
            </div>
        )
    }
}

export default EventDisplay;
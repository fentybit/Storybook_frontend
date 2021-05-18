import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../../redux/actions/eventsActions';

class EventDisplay extends Component {
    componentDidMount() {
        this.props.fetchEvent(this.props.match.params.eventId);
    }

    render() {
        const { event } = this.props;
        console.log(event);

        return (
            <div>
                {(event)
                    ?
                    <>
                        <h5>Event Display</h5>
                        {/* <p>{event.category.name}</p> */}
                        <p>{event.title}</p>
                        <p>{event.vibe}</p>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                        <p>{event.location}</p>
                        <p>{event.description}</p>
                        { (event.images) ? event.images.map(image => <img src={image.url} style={{ height: '200px' }} />) : null}
                    </>
                    :
                    <h5>Loading...</h5>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        event: state.event
    }
}

export default connect(mapStateToProps, { fetchEvent })(EventDisplay);
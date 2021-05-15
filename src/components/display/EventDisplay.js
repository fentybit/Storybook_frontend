import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../../redux/actions/eventsActions';


class EventDisplay extends Component {
    // componentDidMount() {
    //     this.props.fetchEvent(this.props.match.params.eventId)
    // }
    renderEvent = () => {
        if (this.props.events) {
            const eventId = this.props.match.params.eventId;

            return this.props.events.find(event => event.id == eventId);
        }
    }

    render() {
        const event = this.renderEvent();

        return (
            <div>
                <h5>Event Display</h5>
                {/* <p>{event.category.name}</p> */}
                <p>{event.title}</p>
                <p>{event.vibe}</p>
                <p>{event.date}</p>
                <p>{event.time}</p>
                <p>{event.location}</p>
                <p>{event.description}</p>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         category: state.category,
//         event: state.event
//     }
// }

export default EventDisplay;
// export default connect(mapStateToProps, { fetchEvent })(EventDisplay);
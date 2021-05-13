import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../../redux/actions/eventsActions';


class EventDisplay extends Component {
    componentDidMount() {
        this.props.fetchEvent(this.props.match.params.eventId)
    }

    render() {
        const { category, event } = this.props

        return (
            <div>
                <h4>Event Display</h4>
                <p>{category.name}</p>
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

const mapStateToProps = state => {
    return {
        category: state.category,
        event: state.events
    }
}

export default connect(mapStateToProps, { fetchEvent })(EventDisplay);
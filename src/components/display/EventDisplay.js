import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../../redux/actions/eventsActions';

class EventDisplay extends Component {
    componentDidMount() {
        this.props.fetchEvent(this.props.match.params.eventId);
    }

    render() {
        console.log(this.props)
        const { event } = this.props;

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
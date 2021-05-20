import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../../redux/actions/eventsActions';

function EditForm(props) {
    useEffect(() => {
        props.fetchEvent(props.match.params.eventId);
    }, [])

    console.log(props.match.params.eventId)

    return (
        <div>
            <h5>Edit Form</h5>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        event: state.event
    }
}

export default connect(mapStateToProps, { fetchEvent })(EditForm);
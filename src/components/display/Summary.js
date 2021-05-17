import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserEvents } from '../../redux/actions/eventsActions';

// useEffect || React Hooks

class Summary extends Component {
    componentDidMount() {
        this.props.fetchUserEvents();
    }

    render() {
        const places = (this.props.events) ? this.props.events.filter(event => event.location !== '') : null

        return (

            <div>
                { (this.props.events)
                    ?
                    <>
                        <h5>All Entries</h5>
                        <p>Entries | {this.props.events.length}</p>
                        <p>Categories | {this.props.categories.length}</p>
                        <p>Places | {places.length}</p>
                        <p>Photos | TBD</p>
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
        events: state.events
    }
}

export default connect(mapStateToProps, { fetchUserEvents })(Summary);
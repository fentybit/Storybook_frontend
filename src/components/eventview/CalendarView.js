import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CalendarView extends Component {
    renderCategoryEvents = () => {
        if (this.props.events) {
            const categoryId = this.props.match.params.categoryId;

            return this.props.events.filter(event => event.category.id == categoryId);
        }
    }

    render() {
        return (
            <div>
                <h5>Calendar View</h5>
                { (this.props.events)
                    ?
                    this.renderCategoryEvents().map(event => (
                        <div key={event.id}>
                            <p><Link key={event.id} to={`/events/${this.props.match.params.categoryId}/${event.id}`}>{event.title}</Link></p>

                            <p>{event.date}</p>
                            <p>{event.time}</p>
                            <p>{event.vibe}</p>
                            <p>{event.description}</p>
                            <p>----</p>
                        </div>
                    ))
                    :
                    <h5>Loading...</h5>}
            </div>
        )
    }
}


export default CalendarView;
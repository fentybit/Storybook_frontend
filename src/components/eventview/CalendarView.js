import React, { Component } from 'react'

class CalendarView extends Component {
    renderCategoryEvents = () => {
        const categoryId = this.props.match.params.categoryId;

        // this.props.categories.
    }

    render() {
        console.log(this.props.categories)
        return (
            <div>
                <h5>Calendar View</h5>
            </div>
        )
    }
}

export default CalendarView;
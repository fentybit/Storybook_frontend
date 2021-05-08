import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

class EventListContainer extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h3>Container 2</h3>
                    <Route path='/home' render={() => <h5>Home</h5>} />
                </div>
            </BrowserRouter>
        )
    }
}

export default EventListContainer;
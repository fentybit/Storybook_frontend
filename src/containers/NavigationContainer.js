import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

class NavigationContainer extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <h3>Navigation Container</h3>
                    {/* <NavBar /> */}
                    <Route path='/home' render={() => <h5>Home</h5>} />
                </div>
            </BrowserRouter>
        )
    }
}

export default NavigationContainer;
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CategoriesContainer from './CategoriesContainer'

class NavigationContainer extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <h3>Navigation Container</h3>
                    <Route path='/home' render={() => <CategoriesContainer />} />
                </div>
            </BrowserRouter>
        )
    }
}

export default NavigationContainer;
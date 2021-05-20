import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { fetchUserCategories } from '../../redux/actions/categoriesActions';

function NavBar(props) {
    useEffect(() => {
        props.fetchUserCategories();
    }, [])

    const renderCategoriesLink = () => {
        if (props.categories.length > 0) {
            let userCategories = props.categories.sort(function (a, b) {
                let nameA = a.name.toUpperCase()
                let nameB = b.name.toUpperCase()

                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0
            })

            return userCategories.map(category => <p><Link key={category.id} to={`/events/${category.id}`}>{category.name}</Link></p>)
        }
    }

    return (
        <div>
            <h3>Container 1</h3>
            <h5>Hello, {props.user.fullname}</h5>

            { (props.categories.length === 0) ? <h6>Write your first journal entry!</h6> : <h6>All Events</h6>}
            { renderCategoriesLink()}

            <p>---------------</p>
            <NavLink to='/events/newentry'>New Entry</NavLink>
            <p>---------------</p>

            <h6>View</h6>
            <p><NavLink to='/events/calendar'>Calendar</NavLink></p>
            <p><NavLink to='/events/map'>Map</NavLink></p>
            <p><NavLink to='/events/photos'>Photos</NavLink></p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps, { fetchUserCategories })(NavBar);
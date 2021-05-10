import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ user }) => {
    // Need to add conditions if Category's Events are empty
    const renderCategoriesLink = user.categories.map(category => <p><Link key={category.id} to={`/categories/${category.id}`}>{category.name}</Link></p>)

    return (
        <div>
            <h3>Container 1</h3>
            <h5>Hello, {user.fullname}</h5>

            { (user.categories.length === 0) ? null : <h6>All Events</h6>}
            {renderCategoriesLink}

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

export default NavBar;
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ categories, user }) => {
    // Need to add conditions if Category's Events are empty
    const userCategories = categories.map(category => category.name).sort()

    // const renderCategoriesLink = userCategories.map(category => <p><Link key={category} to={`/categories/${categoryId(category)}`}>{category}</Link></p>)

    const categoryId = (name) => {
        let categoryObj = user.categories.find(category => category.name === name)
        if (categoryObj) {
            return categoryObj.id
        }
    }

    console.log(userCategories)
    return (
        <div>
            <h3>Container 1</h3>
            <h5>Hello, {user.fullname}</h5>

            {/* { (user.categories.length === 0) ? null : <h6>All Events</h6>} */}
            {/* { renderCategoriesLink} */}

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
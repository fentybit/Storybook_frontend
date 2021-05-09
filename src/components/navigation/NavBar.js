import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ user, categories }) => {
    // Need to add conditions if Category is empty
    const renderCategoriesLink = categories.map(category => <p><Link key={category.id} to={`/categories/${category.id}`}>{category.name}</Link></p>)

    return (
        <div>
            <h5>Hello, {user.fullname}</h5>
            {renderCategoriesLink}
            <p>---------------</p>
            <NavLink to='/events/newentry'>New Entry</NavLink>
            <p>---------------</p>
            <p>Event View Link here</p>
        </div>
    )
}

export default NavBar;
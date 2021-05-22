import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { fetchUserCategories } from '../../redux/actions/categoriesActions';

import Divider from '@material-ui/core/Divider';
import UILink from '@material-ui/core/Link';

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

            return userCategories.map(category => <p><Link key={category.id} to={`/events/${category.id}`}><UILink component="button" variant="body2">{category.name}</UILink></Link></p>)
        }
    }

    return (
        <div>
            <h4>Hello, {props.user.fullname}</h4>

            <Divider />

            <p>
                <NavLink to='/events'>
                    <UILink component="button" variant="body2">Home</UILink>
                </NavLink>
            </p>

            <Divider />

            { (props.categories.length === 0) ? <h5>Write your first journal entry!</h5> : <h5>All Events</h5>}

            { renderCategoriesLink()}

            <Divider />

            <p font-size='21px' line-height='24px' >
                <NavLink to='/events/newentry'>
                    <UILink justify='middle' component="button" variant="body2">
                        New Entry
                    </UILink>
                </NavLink>
            </p>

            <Divider />

            <h5>View</h5>
            <p>
                <NavLink to='/events/calendar'>
                    <UILink component="button" variant="body2">Calendar</UILink>
                </NavLink>
            </p>

            <p>
                <NavLink to='/events/map'>
                    <UILink component="button" variant="body2">Map</UILink>
                </NavLink>
            </p>

            <p>
                <NavLink to='/events/photos'>
                    <UILink component="button" variant="body2">Photos</UILink>
                </NavLink>
            </p>

            <br />
            <br />
            <Divider />

            <p>
                <NavLink to='/logout'>
                    <UILink component="button" variant="body2">Logout</UILink>
                </NavLink>
            </p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps, { fetchUserCategories })(NavBar);
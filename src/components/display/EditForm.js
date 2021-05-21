import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import { fetchUserCategories } from '../../redux/actions/categoriesActions';
import { fetchEvent, fetchUserEvents } from '../../redux/actions/eventsActions';

function EditForm(props) {
    const { category, event } = props;
    const categoryId = props.match.params.categoryId;
    const eventId = props.match.params.eventId;

    const [entry, setEntry] = useState({
        category: category.name,
        vibe: event.vibe,
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        latitude: event.latitude,
        longitude: event.longitude,
        description: event.description,
        image: event.image
    })

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setEntry({ ...entry, image: reader.result })
        }
    }

    const handleCancel = (event) => {
        props.history.push(`/events/${categoryId}/${eventId}`)
    }

    const handleLocationChange = location => {
        setEntry({ ...entry, location: location })
    }

    const handleOnChange = (event) => {
        setEntry({ ...entry, [event.target.name]: event.target.value })
    }

    const handleSelect = location => {
        geocodeByAddress(location)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                handleLocationChange(location)
                setEntry({ ...entry, location: location, latitude: latLng.lat, longitude: latLng.lng })
                console.log('SUCCESS: ', latLng.lat, latLng.lng)
            })
            .catch(error => console.error('Error', error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // props.patchEvent(entry);

        if ((entry.category) && (entry.category !== 'Please enter Category')) {
            fetch(`https://your-storybook.herokuapp.com/api/v1/events/${eventId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${props.token}`
                },
                body: JSON.stringify({
                    category: entry.category,
                    vibe: entry.vibe,
                    title: entry.title,
                    date: entry.date,
                    time: entry.time,
                    location: entry.location,
                    latitude: entry.latitude,
                    longitude: entry.longitude,
                    description: entry.description,
                    image: entry.image.url
                })
            })
                .then(resp => resp.json())
                .then(data => {
                    setEntry({
                        category: data.category.name,
                        vibe: data.event.vibe,
                        title: data.event.title,
                        date: data.event.date,
                        time: data.event.time,
                        location: data.event.location,
                        description: data.event.description
                    });
                    props.fetchEvent(eventId);
                    props.fetchUserCategories();
                    props.fetchUserEvents();
                    props.history.push(`/events/${categoryId}/${eventId}`);
                })
        }
    }

    const userCategories = props.categories.map(category => category.name).sort()

    const renderCategoryOptions = userCategories.map(category => <option value={category}>{category}</option>);

    return (
        <div>
            <h5>Edit Form</h5>
            <form onSubmit={handleSubmit}>
                <label htmlFor='category'>Category</label>
                <input type='text' name='category' placeholder='New Category' onChange={handleOnChange} value={entry.category} />

                {(props.categories.length)
                    ?
                    <>
                        <select name='category' onChange={handleOnChange}>
                            <option value='' selected disabled hidden>select category</option>
                            {renderCategoryOptions}
                        </select>
                    </>
                    :
                    null
                }
                <br />

                <label htmlFor='vibe'>Vibe</label>
                <select name='vibe' id='vibe' onChange={handleOnChange}>
                    <option value='' selected disabled hidden>select mood</option>
                    <option value='1 rad'>😀 rad</option>
                    <option value='2 good'>😊 good</option>
                    <option value='3 meh'>😕 meh</option>
                    <option value='4 bad'>😞 bad</option>
                    <option value='5 awful'>😩 awful</option>
                </select><br />

                <label htmlFor='title'>Event Title</label>
                <input type='text' name='title' placeholder='Event Title' onChange={handleOnChange} value={entry.title} /><br />

                <label htmlFor='date'>Date</label>
                <input type='date' name='date' placeholder='Event Date' onChange={handleOnChange} value={entry.date} /><br />

                <label htmlFor='time'>Time</label>
                <input type='time' name='time' placeholder='Event Time' onChange={handleOnChange} value={entry.strftime} /><br />

                <label htmlFor='location'>Location</label>
                <PlacesAutocomplete
                    value={entry.location}
                    onChange={handleLocationChange}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>

                <label htmlFor='description'>Description</label>
                <textarea name='description' placeholder='Event Description' onChange={handleOnChange} value={entry.description} /><br />

                <label htmlFor='image'>Image</label>
                <input type='file' name='image' onChange={handleImageChange} />
                {entry.image && (
                    <img
                        src={entry.image.url || entry.image}
                        alt='chosen'
                        style={{ height: '200px' }} />
                )}
                <br />

                <input type='submit' value='Save Changes' />
            </form>
            <br />
            <button onClick={handleCancel}>Cancel</button>
            {/* <button onClick={handleDelete}>Delete</button> */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        category: state.category,
        event: state.event
    }
}

export default connect(mapStateToProps, { fetchUserCategories, fetchEvent, fetchUserEvents })(GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(EditForm));
import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

// import LocationSearchInput from './LocationSearchInput';
// import MapContainer from './MapContainer';

export class Form extends Component {
    state = {
        category: '',
        vibe: '',
        title: '',
        date: '',
        time: '',
        location: '',
        description: ''
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleAutocompleteChange = location => {
        this.setState({ location })
    }

    handleSelect = location => {
        geocodeByAddress(location)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng)
                this.setState({ location: this.state.location })
            })
            .catch(error => console.error('Error', error));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if ((this.state.category) && (this.state.category !== 'Please enter Category')) {
            fetch('http://localhost:3000/api/v1/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${this.props.token}`
                },
                body: JSON.stringify({
                    category: this.state.category,
                    vibe: this.state.vibe,
                    title: this.state.title,
                    date: this.state.date,
                    time: this.state.time,
                    location: this.state.location,
                    description: this.state.description
                })
            })
                .then(resp => resp.json())
                .then(data => this.setState({
                    category: data.category.name,
                    vibe: data.event.vibe,
                    title: data.event.title,
                    date: data.event.date,
                    time: data.event.time,
                    location: data.event.location,
                    description: data.event.description
                }, () => {
                    this.props.history.push(`/events/${data.category.id}/${data.event.id}`)
                }))
        } else {
            event.preventDefault();
            this.setState({ category: 'Please enter Category' });
        }
    }

    render() {
        const userCategories = this.props.categories.map(category => category.name).sort()

        const renderCategoryOptions = userCategories.map(category => <option value={category}>{category}</option>);

        return (
            <div>
                <h5>New Entry Form</h5>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='category'>Category</label>
                    <input type='text' name='category' placeholder='New Category' onChange={this.handleOnChange} value={this.state.category} />

                    {(this.props.categories.length)
                        ?
                        <>
                            <select name='category' onChange={this.handleOnChange}>
                                <option value='' selected disabled hidden>select category</option>
                                {renderCategoryOptions}
                            </select>
                        </>
                        :
                        null
                    }
                    <br />

                    <label htmlFor='vibe'>Vibe</label>
                    <select name='vibe' id='vibe' onChange={this.handleOnChange}>
                        <option value='' selected disabled hidden>select mood</option>
                        <option value='1 rad'>😀 rad</option>
                        <option value='2 good'>😊 good</option>
                        <option value='3 meh'>😕 meh</option>
                        <option value='4 bad'>😞 bad</option>
                        <option value='5 awful'>😩 awful</option>
                    </select><br />

                    <label htmlFor='title'>Event Title</label>
                    <input type='text' name='title' placeholder='Event Title' onChange={this.handleOnChange} value={this.state.title} /><br />

                    <label htmlFor='date'>Date</label>
                    <input type='date' name='date' placeholder='Event Date' onChange={this.handleOnChange} value={this.state.date} /><br />

                    <label htmlFor='time'>Time</label>
                    <input type='time' name='time' placeholder='Event Time' onChange={this.handleOnChange} value={this.state.time} /><br />

                    {/* <SeparateComponent /> */}
                    <label htmlFor='location'>Location</label>
                    {/* <LocationSearchInput type='location' name='location' placeholder='Enter Location' onChange={this.handleOnChange} value={this.state.location} /><br /> */}
                    <PlacesAutocomplete
                        name='location'
                        value={this.state.location}
                        onChange={this.handleAutocompleteChange}
                        onSelect={this.handleSelect}
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
                    {/* <MapContainer /> */}

                    <label htmlFor='description'>Description</label>
                    <textarea name='description' placeholder='Event Description' onChange={this.handleOnChange} value={this.state.description} /><br />

                    <input type='submit' value='Save' />
                </form>
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('')
})(Form)
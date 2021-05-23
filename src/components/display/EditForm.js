import React, { useState } from 'react';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import { fetchUserCategories } from '../../redux/actions/categoriesActions';
import { fetchEvent, fetchUserEvents } from '../../redux/actions/eventsActions';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '10px',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function EditForm(props) {
    const classes = useStyles();

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
                    props.history.push(`/events/${data.category.id}/${eventId}`);
                })
        }
    }

    const userCategories = props.categories.map(category => category.name).sort()

    const renderCategoryOptions = userCategories.map(category => <option value={category}>{category}</option>);

    return (
        <div>
            <CssBaseline />
            <div className={classes.root}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

                    <Grid container spacing={1} alignItems="stretch">
                        <Grid item xs>
                            <TextField name='category' fullWidth required id="standard-full-width" label="Category" onChange={handleOnChange} placeholder='New Category' value={entry.category} margin="dense" />
                        </Grid>

                        {/* <label htmlFor='category'>Category</label>
                <input type='text' name='category' placeholder='New Category' onChange={handleOnChange} value={entry.category} /> */}

                        {(props.categories.length)
                            ?

                            <Grid item xs={3.5} textAlignLast="end">
                                <TextField
                                    id="select-current-category"
                                    helperText="Select from existing Category"
                                    label='Existing Category'
                                    margin="dense"
                                    name='category'
                                    onChange={handleOnChange}
                                    select
                                    value={entry.category}
                                >
                                    <MenuItem value='' selected disabled hidden></MenuItem>
                                    {renderCategoryOptions}
                                </TextField>
                            </Grid>

                            // <>
                            //     <select name='category' onChange={handleOnChange}>
                            //         <option value='' selected disabled hidden>select category</option>
                            //         {renderCategoryOptions}
                            //     </select>
                            // </>

                            :
                            null

                        }
                    </Grid>
                    <br />

                    <TextField id="filled-search" fullWidth margin="dense" name='title' label="Event Title" onChange={handleOnChange} placeholder='Event Title' value={entry.title} />

                    {/* <label htmlFor='title'>Event Title</label>
                <input type='text' name='title' placeholder='Event Title' onChange={handleOnChange} value={entry.title} /><br /> */}

                    <Grid container spacing={1} alignItems="stretch">
                        <Grid item xs>
                            <TextField
                                id="select-currenct-vibe"
                                label='Vibe'
                                margin="dense"
                                name='vibe'
                                onChange={handleOnChange}
                                select
                                value={entry.vibe}
                            >
                                <MenuItem value='' selected disabled hidden></MenuItem>
                                <MenuItem value='1 rad'>😀 rad</MenuItem>
                                <MenuItem value='2 good'>😊 good</MenuItem>
                                <MenuItem value='3 meh'>😕 meh</MenuItem>
                                <MenuItem value='4 bad'>😞 bad</MenuItem>
                                <MenuItem value='5 awful'>😩 awful</MenuItem>
                            </TextField>
                        </Grid>

                        {/* <label htmlFor='vibe'>Vibe</label>
                        <select name='vibe' id='vibe' onChange={handleOnChange}>
                            <option value='' selected disabled hidden>select mood</option>
                            <option value='1 rad'>😀 rad</option>
                            <option value='2 good'>😊 good</option>
                            <option value='3 meh'>😕 meh</option>
                            <option value='4 bad'>😞 bad</option>
                            <option value='5 awful'>😩 awful</option>
                        </select><br /> */}

                        <Grid item xs>
                            <TextField
                                className={classes.textField}
                                id="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Date"
                                margin="dense"
                                name="date"
                                onChange={handleOnChange}
                                type="date"
                                value={entry.date}
                            />
                        </Grid>

                        {/* <label htmlFor='date'>Date</label>
                        <input type='date' name='date' placeholder='Event Date' onChange={handleOnChange} value={entry.date} /><br /> */}

                        <Grid item xs={3.5} textAlignLast="right">
                            <TextField
                                className={classes.textField}
                                id="time"
                                inputProps={{
                                    step: 1800, // 30 min
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Event Time"
                                margin="dense"
                                name="time"
                                onChange={handleOnChange}
                                type="time"
                                value={entry.time}
                            />
                        </Grid>
                    </Grid>

                    {/* <label htmlFor='time'>Time</label>
                <input type='time' name='time' placeholder='Event Time' onChange={handleOnChange} value={entry.strftime} /><br /> */}

                    {/* <label htmlFor='location'>Location</label> */}
                    <PlacesAutocomplete
                        value={entry.location}
                        onChange={handleLocationChange}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <TextField fullWidth margin="dense" label="Location"
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

                    <TextField
                        id="standard-multiline-static"
                        fullWidth
                        label="Event Description"
                        margin="dense"
                        multiline
                        name="description"
                        onChange={handleOnChange} value={entry.description}
                        placeholder="Event Description"
                        rows={6}
                    />

                    {/* <label htmlFor='description'>Description</label>
                <textarea name='description' placeholder='Event Description' onChange={handleOnChange} value={entry.description} /><br /> */}

                    {/* <label htmlFor='image'>Image</label> */}
                    <Typography variant="subtitle1" gutterBottom>
                        <br />
                        <label htmlFor='image'>Image</label>
                    </Typography>

                    {/* <input type='file' name='image' onChange={handleImageChange} /> */}
                    <Input fullWidth type='file' name='image' onChange={handleImageChange} disableUnderline={true} style={{ color: "#616161" }} />

                    {entry.image && (
                        <img
                            src={entry.image.url || entry.image}
                            alt='chosen'
                            style={{ height: '50%', width: '50%', objectFit: 'contain', justifyContent: "center" }} />
                    )}

                    <br />
                    <br />

                    <Grid container alignItems="center" style={{ justifyContent: "center" }}>
                        <Button variant="contained" style={{ backgroundColor: "#0288d1", color: "#FFF" }} type="submit" >
                            Save Changes
                        </Button>
                    </Grid>
                </form>

                {/* <button onClick={handleCancel}>Cancel</button> */}
                <Grid container alignItems="center" style={{ justifyContent: "center" }}>
                    <Button variant="contained" style={{ backgroundColor: "#0288d1", color: "#FFF" }} onClick={handleCancel} >
                        Cancel
                    </Button>
                </Grid>
            </div>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import { fetchUserCategories } from '../../redux/actions/categoriesActions';
import { fetchUserEvents } from '../../redux/actions/eventsActions';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexwrap: 'wrap',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            vibe: '',
            title: '',
            date: '',
            time: '',
            location: '',
            latitude: '',
            longitude: '',
            description: '',
            image: '',
        }

    }

    handleImageChange = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({ image: reader.result })
        };
    }

    handleLocationChange = location => {
        this.setState({ location })
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
                this.handleLocationChange(location)
                this.setState({ latitude: latLng.lat, longitude: latLng.lng })
                console.log('SUCCESS: ', latLng.lat, latLng.lng)
            })
            .catch(error => console.error('Error', error));
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if ((this.state.category) && (this.state.category !== 'Category is required')) {
            fetch('https://your-storybook.herokuapp.com/api/v1/events', {
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
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    description: this.state.description,
                    image: this.state.image
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
                    this.props.fetchUserCategories();
                    this.props.fetchUserEvents();
                    this.props.history.push(`/events/${data.category.id}/${data.event.id}`);
                }))
        } else {
            event.preventDefault();
            this.setState({ category: 'Category is required' });
        }
    }


    render() {
        const classes = this.props;

        const userCategories = this.props.categories.map(category => category.name).sort()
        const renderCategoryOptions = userCategories.map(category => (
            <option key={category.id} value={category}>{category}</option>
        ));

        return (
            <div className={classes.root}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                    <TextField name='category' fullWidth required id="standard-full-width" label="Category" onChange={this.handleOnChange} placeholder='New Category' value={this.state.category} margin="dense" />

                    <Grid container spacing={1} alignItems="stretch">
                        {(this.props.categories.length)
                            ?

                            <Grid item xs>
                                <TextField
                                    margin="dense"
                                    id="outlined-select-currency-native"
                                    select
                                    name='category'
                                    label='Existing Category'
                                    value={this.state.category}
                                    onChange={this.handleOnChange}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="Select from existing Category"
                                    variant="outlined"
                                >
                                    <option value='' selected disabled hidden></option>
                                    {renderCategoryOptions}
                                </TextField>
                            </Grid>
                            :
                            null
                        }
                        <Grid item xs={3.5} textAlignLast="end">
                            <TextField
                                id="outlined-select-currency-native"
                                select
                                margin="dense"
                                name='vibe'
                                label='Vibe'
                                value={this.state.vibe}
                                onChange={this.handleOnChange}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Please select your mood"
                                variant="outlined"
                            >
                                <option value='' selected disabled hidden></option>
                                <option value='1 rad'>😀 rad</option>
                                <option value='2 good'>😊 good</option>
                                <option value='3 meh'>😕 meh</option>
                                <option value='4 bad'>😞 bad</option>
                                <option value='5 awful'>😩 awful</option>
                            </TextField>
                        </Grid>
                    </Grid>

                    <TextField id="filled-search" fullWidth margin="dense" name='title' label="Event Title" onChange={this.handleOnChange} value={this.state.title} />

                    <Grid container spacing={1} alignItems="stretch">
                        <Grid item xs>
                            <TextField
                                id="date"
                                margin="dense"
                                name="date"
                                type="date"
                                label="Date"
                                placeholder='Event Date'
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleOnChange}
                                value={this.state.date}
                            />
                        </Grid>
                        <Grid item xs={3.5} textAlignLast="right">
                            <TextField
                                id="time"
                                label="Event Time"
                                margin="dense"
                                name="time"
                                type="time"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 1800, // 30 min
                                }}
                                onChange={this.handleOnChange} value={this.state.time}
                            />
                        </Grid>
                    </Grid>

                    <Divider style={{ margin: '10px 0' }} />

                    <Typography variant="subtitle1" gutterBottom>
                        <label htmlFor='location'>Location</label>
                    </Typography>

                    <PlacesAutocomplete
                        value={this.state.location}
                        onChange={this.handleLocationChange}
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

                    <TextField fullWidth
                        id="standard-multiline-static"
                        name="description"
                        margin="dense"
                        label="Event Description"
                        multiline
                        placeholder="Event Description"
                        rows={5}
                        onChange={this.handleOnChange} value={this.state.description}
                    />

                    <Typography variant="subtitle1" gutterBottom>
                        <label htmlFor='image'>Image</label>
                    </Typography>

                    <Input fullWidth type='file' name='image' onChange={this.handleImageChange} />
                    {this.state.image && (
                        <img
                            src={this.state.image}
                            alt='chosen'
                            style={{ maxWidth: '40vh' }} />
                    )}

                    <br />
                    <br />

                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </form>
            </div >
        )
    }
}

export default connect(null, { fetchUserCategories, fetchUserEvents })(GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(Form))
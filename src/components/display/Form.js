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
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
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
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
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
            <MenuItem key={category.id} value={category}>{category}</MenuItem>
        ));

        return (
            <div style={{ margin: '10px' }}>
                <div className={classes.root}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                        <Grid container spacing={1} alignItems="stretch">
                            <Grid item xs>
                                <TextField name='category' fullWidth required id="standard-full-width" label="Category" onChange={this.handleOnChange} placeholder='New Category' value={this.state.category} margin="dense" />
                            </Grid>

                            {(this.props.categories.length)
                                ?

                                <Grid item xs={3.5} textAlignLast="end">
                                    <TextField
                                        id="select-current-category"
                                        helperText="Select from existing Category"
                                        label='Existing Category'
                                        margin="dense"
                                        name='category'
                                        onChange={this.handleOnChange}
                                        select
                                        value={this.state.category}
                                    >
                                        <MenuItem value='' selected disabled hidden></MenuItem>
                                        {renderCategoryOptions}
                                    </TextField>
                                </Grid>

                                :
                                null
                            }
                        </Grid>

                        <TextField id="filled-search" fullWidth margin="dense" name='title' label="Event Title" onChange={this.handleOnChange} value={this.state.title} />

                        <Grid container spacing={1} alignItems="stretch">
                            <Grid item xs>
                                <TextField
                                    id="select-currenct-vibe"
                                    helperText="Please select your mood"
                                    label='Vibe'
                                    margin="dense"
                                    name='vibe'
                                    onChange={this.handleOnChange}
                                    select
                                    value={this.state.vibe}
                                >
                                    <MenuItem value='' selected disabled hidden></MenuItem>
                                    <MenuItem value='1 rad'>😀 rad</MenuItem>
                                    <MenuItem value='2 good'>😊 good</MenuItem>
                                    <MenuItem value='3 meh'>😕 meh</MenuItem>
                                    <MenuItem value='4 bad'>😞 bad</MenuItem>
                                    <MenuItem value='5 awful'>😩 awful</MenuItem>
                                </TextField>
                            </Grid>

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
                                    onChange={this.handleOnChange}
                                    type="date"
                                    value={this.state.date}
                                />
                            </Grid>

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
                                    onChange={this.handleOnChange}
                                    type="time"
                                    value={this.state.time}
                                />
                            </Grid>
                        </Grid>

                        <PlacesAutocomplete
                            value={this.state.location}
                            onChange={this.handleLocationChange}
                            onSelect={this.handleSelect}
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
                            onChange={this.handleOnChange} value={this.state.description}
                            placeholder="Event Description"
                            rows={6}
                        />

                        <Typography variant="subtitle1" gutterBottom>
                            <br />
                            <label htmlFor='image'>Image</label>
                        </Typography>

                        <Input fullWidth type='file' name='image' onChange={this.handleImageChange} disableUnderline={true} style={{ color: "#616161" }} />

                        {this.state.image && (
                            <img
                                src={this.state.image}
                                alt='chosen'
                                style={{ height: '50%', width: '50%', objectFit: 'contain', justifyContent: "center" }} />
                        )}

                        <br />
                        <br />

                        <Grid container alignItems="center" style={{ justifyContent: "center" }}>
                            <Button variant="contained" style={{ backgroundColor: "#0288d1", color: "#FFF" }} type="submit" >
                                Save
                        </Button>
                        </Grid>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, { fetchUserCategories, fetchUserEvents })(GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(Form))
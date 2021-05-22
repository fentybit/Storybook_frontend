import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import Grid from '@material-ui/core/Grid';

export class MapView extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        eventTitle: {},
        mapCenter: {
            lat: '',
            lng: ''
        },
        eventId: null
    };

    eventLocations = () => {
        return this.props.events.filter(event => event.location !== '')
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            eventTitle: props,
            activeMarker: marker,
            showingInfoWindow: true,
            eventId: props.id
        })

        this.props.history.push(`/events/map/${this.state.eventId}`)
    }


    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <div>
                <Grid style={{ position: 'relative', height: '87vh' }}>
                    <Map
                        google={this.props.google}
                        initialCenter={{
                            lat: '37.09024',
                            lng: '-95.712891'
                        }}
                        onClick={this.onMapClicked}
                        zoom={4}
                    >

                        {this.eventLocations().map(event => {
                            return (< Marker
                                id={event.id}
                                name={event.title}
                                onClick={this.onMarkerClick}
                                position={{
                                    lat: event.latitude,
                                    lng: event.longitude
                                }}
                            />)
                        }
                        )}

                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                <h3>{this.state.eventTitle.name}</h3>
                            </div>
                        </InfoWindow>
                    </Map>
                </Grid>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(MapView)
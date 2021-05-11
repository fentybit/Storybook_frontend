import React, { Component } from 'react'

export default class MapView extends Component {
    componentDidMount() {
        this.renderMap();
    }

    renderMap = () => {
        loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDWZB6XemnIGIhCcmT1Q5zDI6FAG6lhJB0&callback=initMap')
        window.initMap = this.initMap
    }

    initMap = () => {
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
    }

    render() {
        return (
            <main>
                <div id='map'>
                </div>
            </main>
        )
    }
}

function loadScript(url) {
    let index = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement('script')
    script.src = url;
    script.async = true;
    script.defer = true;

    index.parentNode.insertBefore(script, index)
}
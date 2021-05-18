import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchUserPhotos } from '../../redux/actions/imagesActions';

class PhotosView extends Component {
    componentDidMount() {
        this.props.fetchUserPhotos()
    }

    render() {
        return (
            <div>
                <h5>Photos View</h5>
                { (this.props.images)
                    ?
                    this.props.images.map(image => <Link key={image.id} to={`/events/photos/${image.event_id}`}><img src={image.url} alt={image.id} style={{ height: '200px' }} /></Link>)
                    :
                    <h6>Loading...</h6>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        images: state.images
    }
}

export default connect(mapStateToProps, { fetchUserPhotos })(PhotosView);
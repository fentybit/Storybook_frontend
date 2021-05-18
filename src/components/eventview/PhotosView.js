import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserPhotos } from '../../redux/actions/imagesActions';

class PhotosView extends Component {
    componentDidMount() {
        this.props.fetchUserPhotos()
    }

    render() {
        console.log(this.props.images)
        return (
            <div>
                <h5>Photos View</h5>
                { (this.props.images)
                    ?
                    this.props.images.map(image => <img src={image.url} alt={image.id} style={{ height: '200px' }} />)
                    :
                    <h6>Loading...</h6>}
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
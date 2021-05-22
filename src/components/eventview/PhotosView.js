import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchUserPhotos } from '../../redux/actions/imagesActions';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

function PhotosView(props) {
    const classes = useStyles();

    useEffect(() => {
        props.fetchUserPhotos()
    }, [])

    return (
        <div>
            <h5>Photos View</h5>
            { (props.images)
                ?
                props.images.map(image => <Link key={image.id} to={`/events/photos/${image.event_id}`}><img src={image.url} alt={image.id} style={{ height: '200px' }} /></Link>)
                :
                <div className={classes.root}>
                    <CircularProgress color="secondary" />
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        images: state.images
    }
}

export default connect(mapStateToProps, { fetchUserPhotos })(PhotosView);
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchUserPhotos } from '../../redux/actions/imagesActions';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 450,
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

function PhotosView(props) {
    const classes = useStyles();

    useEffect(() => {
        props.fetchUserPhotos();
    }, [])

    return (
        <div className={classes.root}>
            { (props.images)
                ?

                <Grid style={{ position: 'relative', height: '87vh' }}>
                    <GridList GridList cellHeight={180} className={classes.gridList}>
                        {props.images.map((image) => (
                            <GridListTile key={image.id}>
                                <img src={image.url} alt={image.id} />
                                <GridListTileBar
                                    actionIcon={
                                        <IconButton aria-label={`info about ${image.id}`} className={classes.icon}>
                                            <Link key={image.id} to={`/events/photos/${image.event_id}`}>
                                                <InfoIcon color='secondary' />
                                            </Link>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>

                :
                <div className={classes.root}>
                    <CircularProgress color="secondary" />
                </div>
            }
        </div >
    );
}

const mapStateToProps = state => {
    return {
        images: state.images
    }
}

export default connect(mapStateToProps, { fetchUserPhotos })(PhotosView);
import React from 'react';
import { connect } from 'react-redux';

import { fetchEditedEvent } from '../../redux/actions/eventsActions';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

function EventDisplay(props) {
    const classes = useStyles();

    const renderEvent = () => {
        if (props.events) {
            const eventId = props.match.params.eventId;

            return props.events.filter(event => parseInt(event.id) === parseInt(eventId))[0];
        }
    }

    const handleClick = () => {
        const categoryId = props.match.params.categoryId
        const eventId = props.match.params.eventId

        props.fetchEditedEvent(categoryId, eventId, props.history)
    }

    return (
        <div>
            {(renderEvent())
                ?

                <Grid style={{ position: 'relative', height: '87vh', overflow: 'hidden' }}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Category > <strong>{renderEvent().category.name}</strong>
                    </Typography>

                    <Typography variant="caption" display="block" gutterBottom>
                        {renderEvent().date_strftime} at {renderEvent().time_strftime}
                    </Typography>

                    <Grid container spacing={1} alignItems="stretch">
                        <Grid item xs>
                            <Typography variant="h5" gutterBottom>
                                <strong>{renderEvent().title}</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={2} textAlignLast="right">
                            <Button onClick={handleClick}><EditTwoToneIcon fontSize='small' /></Button>
                        </Grid>
                    </Grid>

                    <Divider />

                    <p><Typography variant="caption" display="block" gutterBottom>
                        Vibe: {(renderEvent().vibe === '1 rad') ? '😀'
                            : (renderEvent().vibe === '2 good') ? '😊'
                                : (renderEvent().vibe === '3 meh') ? '😕'
                                    : (renderEvent().vibe === '4 bad') ? '😞'
                                        : (renderEvent().vibe === '5 awful') ? '😩'
                                            : 'Would you like to add vibe?'
                        }
                    </Typography></p>

                    <p><Typography variant="caption" display="block" gutterBottom>
                        Location: {renderEvent().location}
                    </Typography></p>

                    <Typography variant="body2" gutterBottom>
                        {renderEvent().description}
                    </Typography>
                    <br />

                    <Box style={{ position: 'relative' }} textAlign='center'>
                        {(renderEvent().image) ? <img key={renderEvent().image.id} src={renderEvent().image.url} alt={"chosen"} style={{ height: '100%', width: '100%', objectFit: 'contain' }} /> : null}
                    </Box>
                </Grid>

                :

                <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '80vh' }}>
                    <Grid item xs={3}>
                        <CircularProgress color="secondary" />
                    </Grid>
                </Grid>
            }
            <br />
        </div>
    )
}

export default connect(null, { fetchEditedEvent })(EventDisplay);
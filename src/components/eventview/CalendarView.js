import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UILink from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '10px',
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export default function CalendarView(props) {
    const classes = useStyles();

    const renderCategoryEvents = () => {
        if (props.events) {
            const categoryId = props.match.params.categoryId;

            const sortedCategoryEvents = props.events.sort(function (a, b) {
                let dateA = a.date;
                let dateB = b.date;

                if (dateA > dateB) return -1;
                if (dateA < dateB) return 1;
                return 0;
            })

            return sortedCategoryEvents.filter(event => parseInt(event.category.id) === parseInt(categoryId));
        }
    }

    return (
        <div className={classes.root}>

            { (props.events)
                ?

                renderCategoryEvents().map(event => (
                    <div align='left' key={event.id} style={{ maxHeight: '125px', overflow: 'hidden' }} >

                        <Divider style={{ margin: '10px 0' }} />

                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            {(event.image)
                                ?

                                <Avatar alt={event.id} className={classes.large} src={event.image.url} style={{ margin: '0 10px 10px 0' }} />

                                :

                                <Avatar className={classes.large} style={{ margin: '0 10px 10px 0' }}>
                                    <AddAPhotoTwoToneIcon />
                                </Avatar>
                            }

                            <div>
                                <Link key={event.id} to={`/events/${props.match.params.categoryId}/${event.id}`}>
                                    <UILink component="button" style={{ color: "#01579b", fontSize: "16px" }} variant="body2">
                                        {event.title}
                                    </UILink>
                                </Link>

                                <Typography variant="body2" gutterBottom>
                                    {event.date_strftime} at {event.time_strftime} | {(event.vibe === '1 rad') ? '😀'
                                        : (event.vibe === '2 good') ? '😊'
                                            : (event.vibe === '3 meh') ? '😕'
                                                : (event.vibe === '4 bad') ? '😞'
                                                    : (event.vibe === '5 awful') ? '😩'
                                                        : '-'
                                    }
                                </Typography>
                            </div>
                        </div>

                        <Typography variant="caption" display="block" gutterBottom>
                            {event.description}
                        </Typography>
                    </div>
                ))

                :

                <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '80vh' }}>
                    <Grid item xs={3}>
                        <CircularProgress color="secondary" />
                    </Grid>
                </Grid>
            }
        </div>
    )
}
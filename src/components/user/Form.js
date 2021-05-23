import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetError } from '../../redux/actions/errorActions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const classes = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        color: 'secondary',
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class Form extends Component {
    state = {
        username: '',
        password: '',
        firstname: '',
        lastname: ''
    }

    componentDidMount() {
        this.setState({
            username: '',
            password: '',
            firstname: '',
            lastname: ''
        })

        this.props.resetError();
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleSubmit(this.state)
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper} >
                    <Avatar className={classes.avatar} >
                        <LockTwoToneIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {(this.props.match.url === '/login') ? "Log In" : "Sign Up"}
                    </Typography>
                    <form classname={classes.form} noValidate onSubmit={this.handleSubmit}>
                        {(this.props.match.url === '/login')
                            ?
                            null
                            :
                            <>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstname"
                                    label="Firstname"
                                    name="firstname"
                                    autoFocus
                                    onChange={this.handleOnChange}
                                    value={this.state.firstname}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastname"
                                    label="Lastname"
                                    name="lastname"
                                    autoFocus
                                    onChange={this.handleOnChange}
                                    value={this.state.lastname}
                                />
                            </>
                        }

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            onChange={this.handleOnChange}
                            value={this.state.username}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleOnChange}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            {(this.props.match.url === '/login') ? "Log In" : "Sign Up"}
                        </Button>
                    </form>

                    <br />

                    <Grid item>
                        <Link href={(this.props.match.url === '/login') ? "/signup" : "/login"} variant="body2">
                            {(this.props.match.url === '/login') ? "Don't have an account? Sign Up" : "Have an account? Log In"}
                        </Link>
                    </Grid>
                    {(this.props.error) ? <h6>{this.props.error}</h6> : null}
                </div>
            </Container>
        )
    }
}

export default connect(null, { resetError })(Form);
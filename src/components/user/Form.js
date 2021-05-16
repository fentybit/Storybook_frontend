import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetError } from '../../redux/actions/errorActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
        const classes = makeStyles((theme) => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            avatar: {
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

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form classname={classes.form} noValidate onSubmit={this.handleSubmit}>
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



                        {(this.props.match.url === '/login')
                            ?
                            null
                            :
                            <>
                                <label htmlFor="firstname">Firstname</label>
                                <input type='text' name='firstname' placeholder='Firstname' onChange={this.handleOnChange} value={this.state.firstname} />
                                <label htmlFor="lastname">Lastname</label>
                                <input type='text' name='lastname' placeholder='Lastname' onChange={this.handleOnChange} value={this.state.lastname} />
                            </>
                        }

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
                            {(this.props.match.url === '/login') ? "Login" : "Sign Up"}
                        </Button>
                    </form>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    {(this.props.error) ? <h6>{this.props.error}</h6> : null}
                </div>
            </Container>
        )
    }
}

export default connect(null, { resetError })(Form);
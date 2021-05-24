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
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Grid
                    alignItems="center"
                    container
                    direction="column"
                    justify="center"
                    spacing={0}
                    style={{ minHeight: '90vh' }}
                >
                    <div align='center' >
                        <Avatar style={{ backgroundColor: '#e91e63', margin: '10px' }} >
                            <LockTwoToneIcon style={{ backgroundColor: '#e91e63', color: '#FFF' }} />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            {(this.props.match.url === '/login') ? "Log In" : "Sign Up"}
                        </Typography>

                        <form noValidate onSubmit={this.handleSubmit}>
                            {(this.props.match.url === '/login')
                                ?
                                null
                                :
                                <>
                                    <TextField
                                        autoFocus
                                        fullWidth
                                        id="firstname"
                                        label="Firstname"
                                        margin="normal"
                                        name="firstname"
                                        onChange={this.handleOnChange}
                                        required
                                        value={this.state.firstname}
                                        variant="outlined"
                                    />

                                    <TextField
                                        autoFocus
                                        fullWidth
                                        id="lastname"
                                        margin="normal"
                                        label="Lastname"
                                        name="lastname"
                                        onChange={this.handleOnChange}
                                        required
                                        value={this.state.lastname}
                                        variant="outlined"
                                    />
                                </>
                            }

                            <TextField
                                autoFocus
                                fullWidth
                                id="username"
                                label="Username"
                                margin="normal"
                                name="username"
                                onChange={this.handleOnChange}
                                required
                                value={this.state.username}
                                variant="outlined"
                            />

                            <TextField
                                fullWidth
                                id="password"
                                margin="normal"
                                name="password"
                                label="Password"
                                onChange={this.handleOnChange}
                                required
                                type="password"
                                value={this.state.password}
                                variant="outlined"
                            />

                            <Button
                                fullWidth
                                style={{ color: "#FFF", backgroundColor: "#01579b" }}
                                type="submit"
                                variant="contained"
                            >
                                {(this.props.match.url === '/login') ? "Log In" : "Sign Up"}
                            </Button>
                        </form>

                        <br />

                        <Grid item>
                            <Link href={(this.props.match.url === '/login') ? "/signup" : "/login"} style={{ color: "#01579b" }}>
                                {(this.props.match.url === '/login') ? "Don't have an account? Sign Up" : "Have an account? Log In"}
                            </Link>
                        </Grid>

                        <Typography style={{ color: "#e91e63" }} variant="body1" gutterBottom>
                            {(this.props.error) ? <h6>{this.props.error}</h6> : null}
                        </Typography>
                    </div>
                </Grid>
            </Container>
        )
    }
}

export default connect(null, { resetError })(Form);
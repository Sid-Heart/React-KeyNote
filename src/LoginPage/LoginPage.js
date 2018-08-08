import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, Button, Typography, Grid } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import firebase from '../Firebase'

const styles = theme => ({
    root: {
        height: window.innerHeight,
        backgroundColor:'#cddc39',
    },
    demo: {
        height: "100%",
    },
    paper: {
        padding: 50,
        height: '100%',
        width: '100%',
    },
});


class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            emailId: '', password: ''
        }
    }

    handleChange = field => event => {
        this.setState({ [field]: event.target.value })
    }

    handleSignUp() {
        firebase.auth().createUserWithEmailAndPassword(this.state.emailId, this.state.password)
            .then(data => {
                this.props.onError("Sign Up Success");
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.props.onError(errorMessage + "(" + errorCode + ")");
            });
    }

    handleLogin() {
        firebase.auth().signInWithEmailAndPassword(this.state.emailId, this.state.password)
            .then(data => {
                this.props.onError("Sign In Success");
                this.props.onLogin();
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.props.onError(errorMessage + "(" + errorCode + ")");
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root} direction="row" alignItems="center">
                <Grid item color="secondary" style={{ height: '10%' }} xs={12}/>
                <Grid item color="secondary" style={{ height: '10%' }} xs={12}>
                    <Typography style={{marginBottom:0}} variant='display3' align="center" color="textPrimary">KeyNote</Typography>
                </Grid>
                <Grid item style={{ height: '80%' }} xs={12}>
                    <Grid
                        container
                        spacing={16}
                        className={classes.demo}
                        alignItems="center"
                        direction="row"
                        justify="center"
                    >
                        <Grid key="login" xs={4} item>
                            <Paper className={classes.paper}>
                                <form>
                                    <Grid container alignItems="center" direction="column">
                                        <Grid item>
                                            <Typography variant="headline" color="primary">Login Into Your KeyNote</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="row" spacing={8} alignItems="flex-end">
                                                <Grid item style={{ marginBottom: '3%' }}>
                                                    <AccountCircle />
                                                </Grid>
                                                <Grid item>
                                                    <TextField
                                                        id="name"
                                                        label="Email"
                                                        type="email"
                                                        value={this.state.emailId}
                                                        onChange={this.handleChange('emailId')}
                                                        margin="normal"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="password"
                                                label="Password"
                                                type="password"
                                                value={this.state.password}
                                                onChange={this.handleChange('password')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item style={{ paddingTop: 10 }}>
                                            <Grid container spacing={40}>
                                                <Grid item>
                                                    <Button variant="contained" color="primary" onClick={this.handleLogin.bind(this)}>Login</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="primary" onClick={this.handleSignUp.bind(this)}>Sign Up</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    componentDidMount() {
        var onLoginRef = this.props.onLogin, onLogoutRef=this.props.onLogout
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                onLoginRef();
            }else{
                onLogoutRef();
            }
          });
    }
}

export default withStyles(styles)(LoginPage);

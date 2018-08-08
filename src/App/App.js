import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse'
import LoginPage from '../LoginPage/LoginPage'
import Dashboard from '../Dashboard/Dashboard'


const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      errorSnackbar: ''
    }
  }

  handleError(error) {
    this.setState({ errorSnackbar: error })
  }

  handleClose(event, reason) {
    this.setState({ errorSnackbar: '' })
  }

  notifyLogin(){
    this.setState({isLoggedIn:true})
  }

  notifyLogout(){
    this.setState({isLoggedIn:false})
  }

  render() {
    const { classes } = this.props;
    const loggedIn = this.state.isLoggedIn;

    return (
      <div style={{ height: '90%' }}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.errorSnackbar.length > 0}
          autoHideDuration={6000}
          onClose={this.handleClose.bind(this)}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.errorSnackbar}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose.bind(this)}
            >
              <CloseIcon />
            </IconButton>,
          ]} />
          <Collapse style={{height:'100%'}} in={!loggedIn}>
            <LoginPage onError={this.handleError.bind(this)} onLogin={this.notifyLogin.bind(this)} onLogout={this.notifyLogout.bind(this)} />
          </Collapse>
          <Collapse in={loggedIn}>
            <Dashboard onError={this.handleError.bind(this)}/>
          </Collapse></div>);
  }
}

export default withStyles(styles)(App);

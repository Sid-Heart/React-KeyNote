import React, { Component } from 'react';
import { Typography, AppBar, Toolbar, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Collapse, Input,FormControl, InputLabel, Grid, InputAdornment } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Assignment, NoteAdd, AccountCircle, Search } from '@material-ui/icons';
import MyNote from "./MyNote";
import AddNote from "./AddNote";
import firebase from '../Firebase'

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: window.innerHeight,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: '100%',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0,
    },
    toolbar: theme.mixins.toolbar,
});


class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            selection: 1,
            index: -1,
            search: '.*',
            notes: [{ title: "Hello", message: "Write A Note!! :P", priority: 0 }]
        }
    }

    addNote(title, message, priority, index) {
        let notes = this.state.notes;
        if (index !== -1 ) {
            notes[index].title = title;
            notes[index].message = message;
            notes[index].priority = priority;
            this.props.onError("Note Updated!")
        } else {
            notes.push({ title: title, message: message, priority: priority })
            this.props.onError("Note Added!")
        }
        this.setState({ notes: notes })
        this.changeSelection(1)

        firebase.database().ref('' + firebase.auth().currentUser.uid).set({
            notes
        });
    }

    deleteNode(index){
        let notes = this.state.notes;
        notes.splice(index,1);

        this.setState({ notes: notes })
        this.changeSelection(1)
        firebase.database().ref('' + firebase.auth().currentUser.uid).set({
            notes
        });
    }

    changeSelection(val) {
        this.setState({ selection: val })
    }

    makeUpdateFor(i) {
        this.setState({ selection: 10, index: i })
    }

    handleChange(event){
        this.setState({search:event.target.value})
    }

    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Grid container direction="row" alignContent="center">
                            <Grid item xs={4}>
                                <Typography variant="display2" color="inherit" noWrap>
                                    KeyNote
                        </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth={true} style={{color:"white"}}>
                                    <InputLabel style={{color:"white"}}>Search RegEX</InputLabel>
                                    <Input style={{color:"white"}} id="name-simple" fullWidth={true}
                                    onChange={this.handleChange.bind(this)} value={this.state.search}
                                    startAdornment={
                                        <InputAdornment position="start">
                                          <Search />
                                        </InputAdornment>
                                      }/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} />
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <div className={classes.toolbar} />
                    <List>
                        <ListItem button onClick={this.changeSelection.bind(this, 1)}>
                            <ListItemIcon>
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary="My Notes" />
                        </ListItem>
                        <ListItem button onClick={this.changeSelection.bind(this, 2)}>
                            <ListItemIcon>
                                <NoteAdd />
                            </ListItemIcon>
                            <ListItemText primary="Add Note" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List onClick={this.logOut.bind(this)}>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Collapse in={this.state.selection === 1}>
                        <MyNote notes={this.state.notes} searchEx={this.state.search} onError={this.props.onError} updateReq={this.makeUpdateFor.bind(this)} />
                    </Collapse>
                    <Collapse in={this.state.selection === 2}>
                        {this.state.selection === 2 && <AddNote addNotes={this.addNote.bind(this)} msz="Add" onError={this.props.onError} />}
                    </Collapse>
                    <Collapse in={this.state.selection === 10}>
                        {this.state.selection === 10 && <AddNote node={this.state.notes[this.state.index]} index={this.state.index} msz="Update" deleteNotes={this.deleteNode.bind(this)} addNotes={this.addNote.bind(this)} onError={this.props.onError} />}
                    </Collapse>
                </main>
            </div>);
    }

    logOut() {
        firebase.auth().signOut();
        this.setState({
            selection: 1,
            index: -1,
            search: '.*',
            notes: [{ title: "Hello", message: "Write A Note!! :P", priority: 0 }]
        })
    }

    componentDidMount() {
        let notes = [], setState = this.setState.bind(this);
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebase.database().ref('' + firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
                    notes = snapshot.val();
                    if(notes!=null)
                    if(notes.notes.length!==0)
                    setState({ notes: notes.notes })
                });
            }
        });
    }
}

export default withStyles(styles)(Dashboard);
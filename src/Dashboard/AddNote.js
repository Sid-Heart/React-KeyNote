import React, { Component } from 'react';
import { Typography, Grid, Paper, TextField, Button, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

class AddNote extends Component {
    constructor() {
        super();
        this.index = -1;
        this.state = {
            title: '',
            message: '',
            priority: 0
            }
    }

    handleChange = field => event => {
        this.setState({ [field]: event.target.value })
    }

    handlePriorityChange = event => {
        this.setState({ priority: Number(event.target.value) })
    }

    addNote() {
        if (this.state.title.length > 0 && this.state.message.length > 0)
            this.props.addNotes(this.state.title, this.state.message, this.state.priority, this.index)
        else
            this.props.onError("Enter Valid Details!")
    }

    deleteNote() {
        this.props.deleteNotes(this.index)
    }

    render() {
        return (
            <Grid container direction="row" alignItems="center">
                <Grid item color="secondary" style={{ height: '10%' }} xs={12} />
                <Grid item color="secondary" style={{ height: '10%' }} xs={12} />
                <Grid item style={{ height: '80%' }} xs={12}>
                    <Grid
                        container
                        spacing={16}
                        alignItems="center"
                        direction="row"
                        justify="center">
                        <Grid key="login" xs={6} item style={{ padding: 10}}>
                            <Paper style={{ padding: 10, width: '100%' }}>
                                <form>
                                    <Grid container alignItems="center" direction="column">
                                        <Grid item>
                                            <Typography variant="headline" color="primary">{this.props.msz} Into Your KeyNote</Typography>
                                        </Grid>
                                        <Grid item xs={12} style={{marginTop:'6%'}}>
                                            <FormControl component="fieldset" >
                                                <FormLabel component="legend">Priority</FormLabel>
                                                <RadioGroup
                                                    aria-label="Priority"
                                                    name="priority"
                                                    row={true}
                                                    value={"" + this.state.priority}
                                                    onChange={this.handleChange('priority')}
                                                >
                                                    <FormControlLabel value={"2"} control={<Radio />} label="Low" />
                                                    <FormControlLabel value={"1"} control={<Radio />} label="Medium" />
                                                    <FormControlLabel value={"0"} control={<Radio />} label="High" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
                                            <Grid item>
                                                <TextField
                                                    id="title"
                                                    label="Title"
                                                    type="text"
                                                    value={this.state.title}
                                                    onChange={this.handleChange('title')}
                                                    margin="dense"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="message"
                                                label="Message"
                                                type="text"
                                                value={this.state.message}
                                                onChange={this.handleChange('message')}
                                                margin="dense"
                                                multiline={true}
                                            />
                                        </Grid>
                                        <Grid item style={{ paddingTop: 10 }}>
                                            <Grid container spacing={40}>
                                                <Grid item>
                                                    <Button variant="contained" color="primary" onClick={this.addNote.bind(this)}>{this.props.msz}</Button>
                                                </Grid>
                                                {this.props.msz==="Update" && <Grid item>
                                                    <Button variant="contained" color="primary" onClick={this.deleteNote.bind(this)}>Delete</Button>
                                                </Grid>}
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
        if (typeof this.props.node !== "undefined") {
            this.setState(this.props.node)
            this.index = this.props.index
        }
    }
}
export default AddNote;
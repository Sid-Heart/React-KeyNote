import React, { Component } from 'react';
import { Typography, Grid, Paper, Grow } from '@material-ui/core';

const prorityColor = ["#b71c1c", "#1769aa", "#1b5e20"]

class MyNote extends Component {
    getGridItem(val, i) {
        if (val.title.search(new RegExp(this.props.searchEx,'i')) >= 0 || val.message.search(new RegExp(this.props.searchEx,'i')) >= 0)
            return (<Grid item key={i} xs={4} style={{ padding: 10 }}>
                <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: 1000 * i / this.props.notes.length } : {})}>
                    <Paper onClick={() => { this.props.updateReq(i) }} style={{ padding: 0, height: 150, width: '95%', backgroundColor: prorityColor[val.priority] }}>
                        <Typography varient="display2" align="center" style={{ padding: 10, color: "white", fontWeight: "bold" }}>{val.title}</Typography>
                        <Typography varient="body2" color="secondary" style={{ padding: 10, color: "white" }}>{val.message}</Typography>
                    </Paper>
                </Grow>
            </Grid>)
        else return null;
    }

    render() {
        const notes = this.props.notes;
        return (<Grid container spacing={0} style={{ flexGrow: 1 }}>
            {notes.map((val, i) => (
                this.getGridItem(val, i)
            ))}
        </Grid>);
    }

    componentDidMount() {

    }
}
export default MyNote;
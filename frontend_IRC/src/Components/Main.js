  
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';

import Search from './Search'
import Results from './Results/index'


import { withStyles } from "@material-ui/core/styles";


const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  messagepaper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
  root: {
    boxShadow: 'none',
  },
  container:{
    backgroundColor: 'black'
  },
  greentext:{
    color:'#2EFF22'
  }
});

class Main extends Component {

  state = {
    isLoggedIn: false,
    messages: [],
    value: '',
    name: '',
    room: 'NewRoom',
    time: '',
    gif:''
  }

  client = new W3CWebSocket('ws://127.0.0.1:8000/ws/irc/' + this.state.room + '/');
  //client = new W3CWebSocket('ws://interview1.herokuapp.com/ws/irc/' + this.state.room + '/');
  

  onButtonClicked = (e) => {
    console.log("CLIENT: ", this.client);
    this.client.send(JSON.stringify({
      type: "message",
      message: this.state.value,
      name: this.state.name,
      time: this.state.time,
      gif: this.state.gif
    }));
    this.state.value = ''
    e.preventDefault();
  }

  componentDidMount() {
    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    this.client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        this.setState((state) =>
          ({
            messages: [...state.messages,
            {
              msg: dataFromServer.message,
              name: dataFromServer.name,
              time: dataFromServer.time,
              gif: dataFromServer.gif
            }]
          })
        );
      }
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
        height:"1000px"
      }}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        {this.state.isLoggedIn ?
          <div style={{ marginTop: 50, color:'green' }}>
            Room Name: {this.state.room}
            <Paper style={{ height: 500, maxHeight: 500, overflow: 'auto', boxShadow: 'none', }}>
              {this.state.messages.map(message =>
                <Card className={classes.root}>
                  <CardHeader
                    title={message.name + " dijo:"}
                  />
                  <Grid>
                  
                    <Grid item xs={6}>
                    <Paper className={classes.messagepaper}>
                      {message.msg}
                      <img src={ message.gif } style={{height:"60px"}}/>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper className={classes.messagepaper}>
                      {message.time}
                      </Paper>
                    </Grid>
                    
                  </Grid>
                </Card>
              )}
            </Paper>

            <form className={classes.form} noValidate onSubmit={this.onButtonClicked}>
              <TextField
                id="outlined-helperText"
                label="Make a comment"
                defaultValue="Default Value"
                variant="outlined"
                InputProps={{
                  className: classes.greentext
                }}
                value={this.state.value}
                fullWidth
                onChange={e => {
                  this.setState({ value: e.target.value });
                  this.value = this.state.value;
                }}
              />
              <br/>
              <Search/>
              <Results roomName={this.state.room}/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send
                </Button>
            </form>
          </div>
          :
          <div>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5" className={classes.title}>
                Intervew IRC
                </Typography>
              <form className={classes.form} noValidate onSubmit={value => this.setState({ isLoggedIn: true })}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Chatroom Name"
                  name="Chatroom Name"
                  InputProps={{
                    className: classes.greentext
                  }}
                  value={this.state.room}
                  onChange={e => {
                    this.setState({ room: e.target.value });
                    this.value = this.state.room;
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Username"
                  label="Username"
                  type="Username"
                  id="Username"
                  InputProps={{
                    className: classes.greentext
                  }}
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                    this.value = this.state.name;
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Start Chatting
                </Button>
              </form>
            </div>
          </div>}
      </Container>
      </div>
    )

  }
}
export default withStyles(useStyles)(Main)
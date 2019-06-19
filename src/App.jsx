import React, { Component } from "react";
import Game from "./components/Game";
import Home from "./components/Home"
import FaceUpload from "./components/FaceUpload"
import Auth from "./components/Auth"
//import { withRouter, Route } from 'react-router'
import { Route, Redirect } from 'react-router-dom'

class App extends Component {

  state = {
    user: null
  }

  componentDidMount = () => {
    // this.setState({
    // })
  }


  render() {
    return (
      <>
      <Route exact path="/" component={Home} />

      <Route exact path="/game" component={Game}/>

      <Route exact path="/faceupload" component={FaceUpload}/>

      <Route exact path="/auth" component={Auth}/>



      </>
    );
  }
}

export default App;

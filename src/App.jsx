import React, { Component } from "react";
import Game from "./components/Game";
import Home from "./components/Home"
import FaceUpload from "./components/FaceUpload"
import Auth from "./components/Auth"
//import { withRouter, Route } from 'react-router'
import { Route } from 'react-router-dom'
import video from "./components/particles.mp4";


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
      {/* <video autoPlay={true} muted={true} loop={true} id="myVideo">
          <source src={video} type="video/mp4" />
        </video> */}

      <Route exact path="/" component={Home} />

      <Route exact path="/game" component={Game} scoreUpdate={this.scoreUpdate}/>

      <Route exact path="/faceupload" component={FaceUpload}/>

      <Route exact path="/auth" component={Auth}/>



      </>
    );
  }
}

export default App;

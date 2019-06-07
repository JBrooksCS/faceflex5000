import React, { Component } from "react";
import Game from "./components/Game";
import { withRouter, Route } from 'react-router'

class App extends Component {

  state = {
    user: null
  }

  componentDidMount = () => {
    this.setState({
      user: 1
    })
  }


  render() {
    return (
      <>
        <h1>HELLO FROM APP</h1>
        <Game />
      </>
    );
  }
}

export default App;

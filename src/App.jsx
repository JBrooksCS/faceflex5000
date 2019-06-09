import React, { Component } from "react";
import Game from "./components/Game";
import { withRouter, Route } from 'react-router'

class App extends Component {

  state = {
    user: null
  }

  componentDidMount = () => {
    this.setState({
      
    })
  }


  render() {
    return (
      <>

        <Game />
      </>
    );
  }
}

export default App;

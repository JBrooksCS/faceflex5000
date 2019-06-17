import React, { Component } from "react";
import Game from "./components/Game";
import Home from "./components/Home"
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
        <Route exact path="/game" component={Game}/>


        <Route exact path="/" component={Home} />




      </>
    );
  }
}

export default App;

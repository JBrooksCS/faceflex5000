import React, { Component } from "react";
import Checkmark from "./topBar/photos/checkmark.png"

class TopBar extends Component {
    state = {
    }


  render() {
    return (
      <>
        <img src={this.props.expression}
        width="100"
        height="100"
        style={{zIndex:0}} />
      </>
    );
  }
}

export default TopBar;

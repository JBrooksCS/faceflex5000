import React, { Component } from "react";
import Checkmark from "./topBar/photos/checkmark.png"

class TopBar extends Component {
    state = {
    }


  render() {
    return (
      <>
        <img src={this.props.expression} width="100" height="100" style={{zIndex:0}} />
        {/* <img
          src={Checkmark}
          
          style={{
            zIndex:1,
            position: "absolute",
             top: 0,
             left: 0,
            height: "100px",
            width: "100px",
            display: this.props.completed
          }}
        /> */}
      </>
    );
  }
}

export default TopBar;

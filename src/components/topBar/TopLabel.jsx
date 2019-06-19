import React, { Component } from "react";  
import Checkmark from "./photos/checkmark.png"

class TopLabel extends Component {
  state = {};

  render() {
    return (
      <>
        <img
              src={Checkmark}
              width="100"
              height="120"
              style={{
                zIndex:1,
                position: "absolute",
                visibility: this.props.completed
              }}
            />
      </>
    );
  }
}

export default TopLabel;

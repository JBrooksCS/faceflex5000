import React, { Component } from "react";
import Checkmark from "./photos/checkmark.png"

class TopLabel extends Component {
  state = {};

  render() {
    return (
      <>
        {/* <img
          src={this.props.expression}
          width="100"
          height="100"
          style={{ zIndex: 0, position: "relative" }}
        /> */}
        <img
              src={Checkmark}
              width="100"
              height="100"
              style={{
                zIndex:1,
                position: "absolute",
                //  top: 0,
                //  left: 0,
                visibility: this.props.completed
              }}
            />
      </>
    );
  }
}

export default TopLabel;

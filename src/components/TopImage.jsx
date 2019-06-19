import React, { Component } from "react";
import Checkmark from "./topBar/photos/checkmark.png"

class TopBar extends Component {
    state = {
    }

 
  render() {
    return (
      <>
        <img src={this.props.expression}
        className = {this.props.isHighlighted ? "highlighted_image" : "image" }
        // width="100"
        // height="100"
        width= {this.props.isHighlighted ? "110" : "100"}
        height={this.props.isHighlighted ? "110" : "100"}
        style={{zIndex:0}} />
      </>
    );
  }
}

export default TopBar;

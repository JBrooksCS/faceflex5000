import React, { Component } from "react";
// import Checkmark from "./topBar/photos/checkmark.png"

class TopImage extends Component {
    state = {
    }

 
  render() {
    //console.log(" TOP IMAGE")
    return (
      <>
        <img src={this.props.pictureSrc} alt="alternateseee"
        className = {this.props.isHighlighted ? "highlighted_image" : "image shake-slow shake-constant shake-constant--hover" }
        // width="100"
        // height="100"
        width= {this.props.isHighlighted ? "150" : "100"}
        height={this.props.isHighlighted ? "150" : "100"}
        style={{zIndex:0, borderRadius:"4px" }} />
      </>
    );
  }
}

export default TopImage;

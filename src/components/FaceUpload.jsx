import React, { Component } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import "../styles/style.css";

class FaceUpload extends Component {
  state = {
    img: null,
    displayButtons: "none"
  };

  capture = () => {
    const imageSrc = this.refs.webcam.getScreenshot();
    this.setState({ img: imageSrc, displayButtons: "initial" });
  };
  discard = () => {
      this.setState({
        img: null,
        displayButtons: "none"
      })
  }

  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h1>Make A Face!</h1>
          <Webcam
            id="video"
            audio={false}
            height={350}
            ref="webcam"
            screenshotFormat="image/jpeg"
            width={350}
            //videoConstraints={videoConstraints}
            style={{}}
          />
          <button onClick={this.capture}>Capture Photo</button>
          {/* <canvas id="canvas" ref="canvas" style={{ position: "absolute" }} />  */}
          <img src={this.state.img} alt="" />
          <button
            className="saveButton"
            style={{ display: this.state.displayButtons }}
          >
            Save
          </button>
          <button
            className="discardButton"
            style={{ display: this.state.displayButtons }}
            onClick={this.discard}
          >
            Discard
          </button>
        </div>
      </>
    );
  }
}

export default FaceUpload;

import React, { Component } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import "../styles/style.css";
import video from "./particles.mp4";


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
  goHome = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <>
      <video autoPlay={true} muted={true} loop={true} id="myVideo">
            <source src={video} type="video/mp4" />
        </video>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        ><div className="home-title">
          <h1 className="title-text text-gradient" style={{margin: ".4em 0 0 0", fontSize: "3em"}}>Make A Face!</h1>
          </div>
          <Webcam
            id="video"
            audio={false}
            height={350}
            ref="webcam"
            screenshotFormat="image/jpeg"
            width={350}
            //videoConstraints={videoConstraints}
            style={{filter: `hue-rotate(${170}deg)` }}
          />
          <button onClick={this.capture}>Capture Photo</button>
          {/* <canvas id="canvas" ref="canvas" style={{ position: "absolute" }} />  */}
          <img src={this.state.img} style={{filter: `hue-rotate(${170}deg)` }} alt="" />
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
        <div className="row footer">
        <button className="goHome" onClick={this.goHome}>
            Home
          </button>
          </div>
      </>
    );
  }
}

export default FaceUpload;

import React, { Component } from "react";
//import * as faceapi from "./face-api.min";
import ReactDOM from 'react-dom';
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 350,
  height: 350,
  facingMode: "user"
};

const MODEL_URL = "/models";
console.log(faceapi.nets)

class Game extends Component {
 

  async componentDidMount() {
    console.log("component did mount")
    await this.loadModels();
    const input = this.refs.webcam.video
    const canvas = this.refs.canvas
    console.log(input)
    //Start of async?
    console.log(canvas)
    const detections = await faceapi
      .detectAllFaces(input, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
      const displaySize = { width: 350, height: 350 };
      //faceapi.matchDimensions(canvas, displaySize)

      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  }

  async loadModels() {
    //await faceapi.loadModels(MODEL_URL)
    const input = this.refs.webcam
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models")
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models")
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models")
      await faceapi.nets.faceExpressionNet.loadFromUri("/models")
      // navigator.getUserMedia(
      //   { video: {} },
      //   stream => (input.srcObject = stream),
      //   err => console.error(err)
      // );

  }

   startVideo() {

  }



  render() {
    console.log("rendering")
    return (
      // <script defer src="face-api.min.js" />
      <>
        <h1>HELLO FROM GAME!</h1>
        <div className="container">
          <Webcam
            id="video"
            audio={false}
            height={350}
            ref="webcam"
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          {/* <video id="video" ref= "webcam"></video> */}
          <canvas id="canvas" ref="canvas" width={296} height={296} style={{position: 'absolute'}} />
        </div>
      </>
    );
  }
}

export default Game;

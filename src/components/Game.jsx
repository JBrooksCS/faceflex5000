import React, { Component } from "react";
//import * as faceapi from "./face-api.min";
import ReactDOM from "react-dom";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 350,
  height: 350,
  facingMode: "user"
};

const MODEL_URL = "/models";
//console.log(faceapi.nets)

class Game extends Component {
  state = {
    bg_color: "blue"
  };

  async componentDidMount() {
    console.log("component did mount");
    await this.loadModels();
    const input = this.refs.webcam.video;
    const canvas = this.refs.canvas;
    const container_div = this.refs.container;
    const displaySize = { width: 400, height: 400 };
    let isCleared = true;
    let degrees = 90;
    let frame = 0;
    let angrySound = document.querySelector("#angry")
    let shockedSound = document.querySelector("#shocked")
    faceapi.matchDimensions(canvas, displaySize);

    //console.log(input)
    //Start of async?
    //console.log(canvas)
    const useTinyModel = true;

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(
          input,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 128})
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      //frame++;
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

      //rotate hue
      // if (frame % 5 === 0) {
      //   degrees = (degrees + 15) % 360;
      //   ctx.filter = `hue-rotate(${degrees}deg)`;
      // }

      // if (frame % 30 === 0){
      //   ctx.clearRect(0, 0, canvas.width, canvas.height);
      // }

      var dominant_expression = "";
      var expression_confidence = -1;
      // console.log(detections)
      // let obj = resizedDetections[0].expressions
      // if (detections[0].expressions) {
      if (detections[0]) {
        let obj = detections[0].expressions;
        Object.keys(obj).forEach(function(key, index) {
          // key: the name of the object key
          // index: the ordinal position of the key within the object
          if (obj[key] > expression_confidence) {
            //Then this exp is the new king
            dominant_expression = key;
            expression_confidence = obj[key];
          }
          //console.log(dominant_expression, expression_confidence)
          switch (dominant_expression) {
            case "angry":
              document.body.style.backgroundColor = "darkred";
              container_div.style.backgroundColor = "red";
              angrySound.play()
              break;
            case "disgusted":
              document.body.style.backgroundColor = "green";
              container_div.style.backgroundColor = "lightgreen";

              break;
            case "fearful":
              document.body.style.backgroundColor = "purple";
              break;
            case "happy":
              document.body.style.backgroundColor = "lightblue";
              container_div.style.backgroundColor = "steelblue";
              break;
            case "neutral":
              document.body.style.backgroundColor = "black";
              container_div.style.backgroundColor = "black";
              if (angrySound.played){
                angrySound.pause()
              }
              if (shockedSound.played){
                shockedSound.pause()
              }
              break;
            case "sad":
              document.body.style.backgroundColor = "blue";
              container_div.style.backgroundColor = "darkblue";

              break;
            case "surprised":
              document.body.style.backgroundColor = "yellow";
              container_div.style.backgroundColor = "darkorange";
              shockedSound.play()
              break;

            default:
          }
        });
      }
    }, 100); //100);

    //this.refs.container.style.backgroundColor = this.state.bg_color;
  }
  changeWithExpression = () => {};

  async loadModels() {
    //await faceapi.loadModels(MODEL_URL)
    //const input = this.refs.webcam
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    // await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models")
    //await faceapi.nets.faceRecognitionNet.loadFromUri("/models")
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    // navigator.getUserMedia(
    //   { video: {} },
    //   stream => (input.srcObject = stream),
    //   err => console.error(err)
    // );
  }

  //  startVideo() {

  // }

  render() {
    console.log("rendering");
    return (
      // <script defer src="face-api.min.js" />
      <>
        <div
          ref="container"
          className="container"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 100,
            padding: "5px"
          }}
        >
          <Webcam
            id="video"
            audio={false}
            height={350}
            ref="webcam"
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
            style={{ display: "none" }}
          />
          {/* <canvas id="canvas" ref="canvas" style={{ position: "absolute" }} /> */}

          <canvas id="canvas2" ref="canvas" style={{ position: "relative" }} />

        </div>
        <audio id="angry" src="./sounds/angry.mp3"></audio>
        <audio id="shocked" src="./sounds/shocked.mp3"></audio>
      </>
    );
  }
}

export default Game;

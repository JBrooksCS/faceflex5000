import React, { Component } from "react";
//import * as faceapi from "./face-api.min";
import ReactDOM from "react-dom";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import TopBar from "./topBar/TopBar";

const videoConstraints = {
  width: 200,
  height: 200,
  facingMode: "user"
};

// const MODEL_URL = "/models";
//console.log(faceapi.nets)

class Game extends Component {
  state = {
    expression: "neutral",
    color: "black"
  };
  //Color variables - setting state to one of these depending on expression detected
  happyColor = "pink"
  disgustColor = "green"
  sadColor = "blue"
  shockedColor = "yellow"
  angryColor = "red"
  scaredColor = "purple"
  neutralColor = "black"

  async componentDidMount() {
    document.body.style.backgroundColor = "black";
    console.log("component did mount");
    await this.loadModels();
    const input = this.refs.webcam.video;
    const canvas = this.refs.canvas;
    const container_div = this.refs.container;
    const displaySize = { width: 400, height: 400 };
    let isCleared = true;
    let degrees = 90;
    let frame = 0;
    faceapi.matchDimensions(canvas, displaySize);

    //console.log(input)
    //Start of async?
    //console.log(canvas)
    const useTinyModel = true;

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(
          input,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 128 })
        )
        .withFaceLandmarks()
        .withFaceExpressions();
      //frame++;
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      //rotate hue
      // if (frame % 5 === 0) {
      //   degrees = (degrees + 15) % 360;
      //   ctx.filter = `hue-rotate(${degrees}deg)`;}
      // if (frame % 30 === 0){
      //   ctx.clearRect(0, 0, canvas.width, canvas.height);}

      var dominant_expression = "";
      var expression_confidence = -1;

      //This checks to make sure we've loaded a detection
      if (detections[0]) {
        let obj = detections[0].expressions;
        //Sorts through the detections obj, assigns most likely exp to dominant_expression and expression_confidence
        Object.keys(obj).forEach(function(key, index) {
          // key: the name of the object key, index: the ordinal position of the key within the object
          if (obj[key] > expression_confidence) {
            //Then this exp is the new king
            dominant_expression = key;
            expression_confidence = obj[key];
          }
        });
        if (dominant_expression !== this.state.expression) {
          this.changeWithExpression(dominant_expression);
        }
      }
    }, 100); //100);
  }

  //this.refs.container.style.backgroundColor = this.state.bg_color;
  changeWithExpression = dom_exp => {
    console.log("FROM ", this.state.expression, "TO", dom_exp);


    switch (dom_exp) {
      case "angry":
        this.setState({ expression: "angry", color: this.angryColor  });
        break;

      case "disgusted":
        this.setState({ expression: "disgusted", color: this.disgustedColor });
        break;

      case "fearful":
        this.setState({ expression: "fearful", color: this.fearfulColor });
        break;

      case "happy":
        this.setState({ expression: "happy", color: this.happyColor });
        break;

      case "neutral":
        this.setState({ expression: "neutral", color: this.neutralColor });
        break;

      case "sad":
        this.setState({ expression: "sad", color: this.sadColor });
        break;

      case "surprised":
        this.setState({ expression: "shocked", color: this.shockedColor });
        break;

      default:
    }
  };

  async loadModels() {
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
    //console.log("rendering");
    return (
      // <script defer src="face-api.min.js" />
      <>
        <TopBar expression={this.state.expression}/>
        <div
          ref="container"
          className="container"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: 0,
            padding: "0px",
            height: "400",
            backgroundColor: this.state.color
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
      </>
    );
  }
}

export default Game;

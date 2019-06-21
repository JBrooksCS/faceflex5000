import React, { Component } from "react";
//import * as faceapi from "./face-api.min";
import ReactDOM from "react-dom";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import TopBar from "./topBar/TopBar";
import ALL_IMAGES from "./topBar/ALL_IMAGES"
import "../styles/style.css";

const videoConstraints = {
  width: 200,
  height: 200,
  facingMode: "user"
};

class Game extends Component {
  state = {
    isLoading : true,
    expression: "",
    color: "black",
    current_position: 0,
    score: 0,
    startTime: 0,
    endTime: 0,
    timeRemaining: 60
  };

  //TEST_COLOR = "red";
  //Color variables - setting state to one of these depending on expression detected
  happyColor = "pink";
  disgustedColor = "green";
  sadColor = "blue";
  shockedColor = "yellow";
  angryColor = "red";
  fearfulColor = "purple";
  neutralColor = "black";
  //Round 1 emotion array
  round = []//["happy", "sad", "surprised", "angry", "disgusted", "fearful"];
  // round_length = this.round.length;
  round_length = ALL_IMAGES.length;

  async componentDidMount() {
    
    document.body.style.backgroundColor = "black";
    console.log("component did mount");
    // console.log("OG Images", ALL_IMAGES)
    //Initialize state array with a random array of face objects
    //this.round = this.randomizeArray(ALL_IMAGES)
    this.round = ALL_IMAGES

    console.log("Round Images", this.round[0].exp)


    await this.loadModels();
    //TO DO add these to higher scope so theyre not re-declared every time
    const input = this.refs.webcam.video;
    const canvas = this.refs.canvas;
    //const container_div = this.refs.container;
    this.setState({isLoading:false})
    
    const displaySize = { width: 400, height: 400 };
    // let degrees = 90;
    // let frame = 0;
    faceapi.matchDimensions(canvas, displaySize);
    //console.log(canvas)
    // const useTinyModel = true;
    let now = Math.floor(Date.now() / 1000);
    this.setState({
      startTime: now,
      endTime: now + 12
    });

    this.interval = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(
          input,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 128 })
        )
        .withFaceLandmarks()
        .withFaceExpressions();
      //console.log("FACE TO MAKE - ", this.round[this.state.current_position].exp)
      //frame++;
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      let ctx = canvas.getContext("2d");
      // if (this.state.expression === "neutral")
      // {ctx.clearRect(0, 0, canvas.width, canvas.height);}
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
        this.updateTimer();
      }
    }, 100); //100);
  }
  updateTimer() {
    this.setState({
      timeRemaining: this.state.endTime - Math.floor(Date.now() / 1000)
    });
    if (this.state.timeRemaining <= 0){
      localStorage.setItem("score", this.state.score)
      localStorage.setItem("scoreModal", true)
      this.props.history.push("/")
    }
  }

  componentWillUnmount() {
    // Remove this to see warning.
    clearInterval(this.interval);
  }

  //this.refs.container.style.backgroundColor = this.state.bg_color;
  changeWithExpression = dom_exp => {
    //console.log("FROM ", this.state.expression, "TO", dom_exp);

    switch (dom_exp) {
      case "angry":
        //if the expression detected is equal to the expression we want to match
        if (dom_exp === this.round[this.state.current_position].exp) {
          let position = (this.state.current_position + 1) % (this.round_length);
          let new_score = this.state.score + 1;
          this.setState({
            expression: "angry",
            color: this.angryColor,
            current_position: position,
            score: new_score
          });
        } else {
          this.setState({ expression: "angry", color: this.angryColor });
        }
        break;

      case "disgusted":
        if (dom_exp === this.round[this.state.current_position].exp) {
          let position = (this.state.current_position + 1) % (this.round_length);
          let new_score = this.state.score + 1;
          this.setState({
            expression: "disgusted",
            color: this.disgustedColor,
            current_position: position,
            score: new_score
          });
        } else {
          this.setState({
            expression: "disgusted",
            color: this.disgustedColor
          });
        }
        break;

      case "fearful":
        if (dom_exp === this.round[this.state.current_position].exp) {
          let position = (this.state.current_position + 1) % (this.round_length);
          let new_score = this.state.score + 1;
          this.setState({
            expression: "fearful",
            color: this.fearfulColor,
            current_position: position,
            score: new_score
          });
        } else {
          this.setState({ expression: "fearful", color: this.fearfulColor });
        }
        break;

      case "happy":
        if (dom_exp === this.round[this.state.current_position].exp) {
          let position = (this.state.current_position + 1) % (this.round_length);
          let new_score = this.state.score + 1;
          this.setState({
            expression: "happy",
            color: this.happyColor,
            current_position: position,
            score: new_score
          });
        } else {
          this.setState({ expression: "happy", color: this.happyColor });
        }
        break;

      case "neutral":
        this.setState({ expression: "neutral", color: this.neutralColor });
        break;

      case "sad":
        if (dom_exp === this.round[this.state.current_position].exp) {
          let position = (this.state.current_position + 1) % (this.round_length);
          let new_score = this.state.score + 1;
          this.setState({
            expression: "sad",
            color: this.sadColor,
            current_position: position,
            score: new_score
          });
        } else {
          this.setState({ expression: "sad", color: this.sadColor });
        }
        break;

      case "surprised":
        if (dom_exp === this.round[this.state.current_position].exp) {
          let position = (this.state.current_position + 1) % (this.round_length);
          let new_score = this.state.score + 1;
          this.setState({
            expression: "surprised",
            color: this.shockedColor,
            current_position: position,
            score: new_score
          });
        } else {
          this.setState({ expression: "surprised", color: this.shockedColor });
        }
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

  randomizeArray = (arrayToRandomize) => {
    console.log("Made it TO randomize")
    let arr_1 = arrayToRandomize
    let arr_2 = []

    while(arr_1.length !== 0){
      let randomIndex = Math.floor(Math.random() * arr_1.length)
      arr_2.push(arr_1[randomIndex])
      arr_1.splice(randomIndex, 1)
    }
    console.log("Made it OUT randomize")

    return (arr_2)
  }

  restart = () => {
    let now = Math.floor(Date.now() / 1000);
    this.setState({
      current_position: 0,
      score: 0,
      startTime: now,
      endTime: now + 60
    });
    this.updateTimer();
  };
  goHome = () => {
    this.props.history.push("/");
  };

  render() {
    //console.log("rendering");
    return (
      // <script defer src="face-api.min.js" />


      <>
        <div>
          {(this.isLoading) ? (<div>LOADING</div>) :
        (<TopBar current_position={this.state.current_position} round={this.round} round_length={this.round_length}/>)
          }
        </div>
        
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
        <div className="row footer">
          <button className="restart" onClick={this.restart}>
            Restart
          </button>
          <button className="goHome" onClick={this.goHome}>
            Home
          </button>
          <div className="score">Faces Accumulated : {this.state.score}</div>
          <div className="timer"> {this.state.timeRemaining}</div>
        </div>
      </>
    );
  }
}
export default Game;

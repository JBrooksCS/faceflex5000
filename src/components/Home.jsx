import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import Leaderboard from "./Leaderboard"
import Title from "./Title"
import video from "./particles.mp4"

class Home extends Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    // this.setState({
    // })
  };

  render() {
    return (
      <>
        <video autoPlay={true} muted={true} loop={true} id="myVideo">
            <source src={video} type="video/mp4" />
        </video>


        <div className="home-title">
          <Title />
        </div>
        <div className="home-containers">

        <div className="home-container-left">
          <div className="home-link">
            <Link className="nav-link" to="/game">
              PLAY THE GAME
            </Link>
          </div>

          <div className="home-link">
            <Link className="nav-link" to="/">
              SIGN IN / UP
            </Link>
          </div>

          <div className="home-link">
            <Link className="nav-link" to="/faceupload">
              CONTRIBUTE YOUR FACE
            </Link>
          </div>
        </div>
        <div className="home-container-right">
            <Leaderboard />
        </div>
        </div>
      </>
    );
  }
}

export default Home;

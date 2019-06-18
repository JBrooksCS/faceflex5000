import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import Leaderboard from "./Leaderboard";
import Title from "./Title";
import video from "./particles.mp4";
import fire from "../config/Fire";

class Home extends Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    let logged_in_user = fire.auth().currentUser;
    this.setState({
      user: logged_in_user
    })
    console.log("Home Mounted")
  };
  
  signOut = () => {
    fire
      .auth()
      .signOut()
      .then(function() {
        sessionStorage.clear();
        console.log("Sign-out successful.");
      })
      .then(() => {
        this.props.history.push("/");
      })
      .then(()=> {this.setState({user: null})})
      .catch(error => {
        const newState = {
          modal: false,
          error: []
        };
        console.log("ERROR", error);
        console.log("ERROR Status ", error);
        newState.modal = !this.state.modal;
        newState.error = error.message;
        this.setState(newState);
      });
  };

  render() {
    return (
      <>
        <video autoPlay={true} muted={true} loop={true} id="myVideo">
          <source src={video} type="video/mp4" />
        </video>
        {
          (this.state.user) ? (
        <div className="signOutDiv" >
          <button className="signOut" onClick={this.signOut}>
            Sign Out
          </button>
        </div>
          ) : (<div></div>)
        }
        <div className="home-title" style={{ padding: "1em 0 3em 0" }}>
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
              <Link className="nav-link" to="/auth">
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

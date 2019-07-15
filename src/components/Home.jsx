import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import "../styles/shake.css"
import Leaderboard from "./Leaderboard";
import Title from "./Title";
import video2 from "./FACEFLEX_BG.mp4";
import {fire} from "../config/Fire";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  //Fade
} from "reactstrap";
import home_song from "./FaceFlex_music.mp3"

class Home extends Component {
  state = {
    user: null,
    modal: false,
    score: 0,
    username: null
  };

  componentDidMount = () => {
    //Check localStorage for logged in email
    //Fix this later
    let userName = localStorage.getItem("userEmail")
    if (localStorage.getItem("userEmail")) {
      this.setState({ username: this.parseUserName(userName) })
    }
    let localStorageToBool = localStorage.getItem("scoreModal")
    //Converting localStorage info into boolean since Modal was pissed it was a string
    let modalBool = (localStorageToBool == "true")
    this.setState({
      user: localStorage.getItem("userEmail"),
      modal: modalBool
    });
    //localStorage.setItem("scoreModal", false)
    // console.log("Home Mounted");
  };

  parseUserName = (email) => {
    let name = email.substring(0, email.lastIndexOf("@"));
    return name
  }

  signOut = () => {
    fire
      .auth()
      .signOut()
      .then(function () {
        localStorage.clear();
        console.log("Sign-out successful.");
      })
      .then(() => {
        this.setState({ user: null });
      })
      .then(() => {
        this.props.history.push("/");
      })
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

  closeModal = () => {
    const newState = {
      modal: true,
      error: []
    };
    localStorage.setItem("scoreModal", false)

    //console.log("EMail Val ", this.refs.signUpEmail.value);
    newState.modal = !this.state.modal;
    this.setState(newState);
  };

  toggle = () => {
    //console.log("state", this.state);
    localStorage.setItem("scoreModal", false)
    this.setState(prevState => ({
      modal: !prevState.modal
    }));

  };

  render() {


    return (
      <>
        <div className="videoContainer" >
        <video autoPlay={true} muted={true} loop={true} id="myVideo">
          <source src={video2} type="video/mp4" />
        </video>
        </div>
        
        <div className="home-title" style={{ padding: "1em 0 3em 0" }}>
          <Title />
        </div>
        <div className="home-containers">
          <div className="home-container-left">
          <div className="home-link">
              <Link className="nav-link shake-slow shake-constant shake-constant--hover" to="/game" style={{ textDecoration: 'none' }}>
                PLAY THE GAME
              </Link>
            </div>
            { //Don't render login / signup if user is already logged in
              (this.state.user === null) ?
                (<div className="home-link">
                  <Link className="nav-link" to="/auth" style={{ textDecoration: 'none' }}>
                    SIGN IN / UP
              </Link>
                </div>)
                :
                (
                  <div className="home-link">
                    <Link className="nav-link" to="/top20" style={{ textDecoration: 'none' }}> ~ TOP 20 ~ </Link>
                  </div>
                )

            }

           {/* <div className="home-link">
              <Link className="nav-link" to="/faceupload" style={{ textDecoration: 'none' }}>
                CONTRIBUTE YOUR FACE
              </Link>
          </div> */}
          </div>
          <div className="home-container-center">
          
          </div>
          <div className="home-container-right">
            <h3 className="hallOfFame">HALL OF FAME</h3>
            <Leaderboard />
          </div>

          <div className="row footer">
          {/* <audio autoPlay={true} controls>
          <source src={home_song} type="audio/mpeg"/>
        </audio> */}
            {(this.state.user !== null) ? (
              <div className="signOutDiv">
                <button className="signOut" onClick={this.signOut}>
                  Log out - {this.state.username}
                </button>
              </div>
            ) : (
                <></>
              )}
          </div>
        </div>
      </>
    );
  }
}

export default Home;

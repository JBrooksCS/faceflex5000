import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import "../styles/shake.css"
import Leaderboard from "./Leaderboard";
import Title from "./Title";
import video from "./particles.mp4";
import video2 from "./FACEFLEX_BG.mp4";
import fire from "../config/Fire";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  //Fade
} from "reactstrap";

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
    console.log("Home Mounted");
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
        {/* {(localStorage.getItem("scoreModal") === "true") ?
          <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader className="modalHeader" toggle={this.toggle}>Game over!</ModalHeader>
              <ModalBody className="modalBody">
                Congratulations! You earned {localStorage.getItem("score")} faces!
              {(this.state.user) ? ("") : (" Sign In / Sign Up to add your score to the Hall of Fame!")}

              </ModalBody>
              <ModalFooter className="modalFooter">
                <Button id="modalButton" onClick={this.toggle}>
                  Got it!
              </Button>
              </ModalFooter>
            </Modal>
          </div>
          : <></>
        } */}

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
              <Link className="nav-link" to="/game" style={{ textDecoration: 'none' }}>
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
                    <Link className="nav-link" to="/" style={{ textDecoration: 'none' }}>Profile Info</Link>
                  </div>
                )

            }

            <div className="home-link">
              <Link className="nav-link" to="/faceupload" style={{ textDecoration: 'none' }}>
                CONTRIBUTE YOUR FACE
              </Link>
            </div>
          </div>
          <div className="home-container-center">
          
          </div>
          <div className="home-container-right">
            <h3 className="hallOfFame">HALL OF FAME</h3>
            <Leaderboard />
          </div>

          <div className="row footer">
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

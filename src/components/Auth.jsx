import React, { Component } from "react";
import * as firebase from "firebase/app";
import 'firebase/storage'
import Title from "./Title";
import video2 from "./FACEFLEX_BG.mp4";
import { Link } from "react-router-dom";
import {fire} from "../config/Fire";
import { saveProfile } from "../API_Manager/profiles";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  //Fade
} from "reactstrap";
import sad from "./topBar/photos/sad_toby.jpeg"
//import "firebase/auth";
import "../styles/style.css";
import default_icon from "./topBar/photos/Face_Icon.png"

class Auth extends Component {

  //via instructions from https://firebase.google.com/docs/storage/web/upload-files
  storageRef = firebase.storage().ref('profile_images');

  state = {
    signin_email: "",
    signup_email: "",
    signin_username: "",
    signup_username: "",
    signin_password: "",
    signup_password: "",
    photo: null,
    modal: false,
    error: [],
    hideSignIn: false
  };
  // For modal
  toggle = () => {
    //console.log("state", this.state);
    this.setState(prevState => ({
      modal: !prevState.modal,
      signin_email: "",
      signup_email: "",
      signin_username: "",
      signup_username: "",
      signin_password: "",
      signup_password: "",
      photo: default_icon,
      error: []
    }));
  };

  closeModal = () => {
    const newState = {
      modal: true,
      error: []
    };

    newState.modal = !this.state.modal;
    this.setState(newState);
  };

  login = e => {
    const newState = {
      modal: true,
      error: [],
      signin_email: "",
      signin_username: ""
    };
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(
        this.state.signin_email,
        this.state.signin_password
      )
      .then(() => {
        var user = firebase.auth().currentUser;
        localStorage.setItem("userEmail", user.email);
        this.props.history.push("/");
      })
      .catch(error => {
        newState.modal = !this.state.modal;
        newState.error = error.message;
        this.setState(newState);
      });
  };

  signup = e => {
    let newUser = {
      email: this.state.signup_email,
      password: this.state.signup_password,
      photo: this.state.photo
    };
    e.preventDefault();
    let newState = {
      modal: false,
      error: [],
      hideSignIn: true
    }
    fire
      .auth()
      .createUserWithEmailAndPassword(
        this.state.signup_email,
        this.state.signup_password
      ).then(() => {
        this.setState(newState)
        alert("Success! Now log in with your new account and prepare to FACEFLEX-5000")
        //creating file, making child and giving it a unique name
      })
      .then(() => {
        let userName = this.state.signup_email.substring(0, this.state.signup_email.lastIndexOf("@"));
        newUser.userName = userName;
        // We dont want to store the password in our DB - leave that to Firebase
        delete newUser.password;
        saveProfile(newUser)
      })
      .catch(error => {
        newState = {
          modal: !this.state.modal,
          error: error.message,
          hideSignIn: false
        };
        this.setState(newState);
      })
  };

  render() {
    return (
      <>
        <div>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
          />
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader className="modalHeader" toggle={this.toggle}>S H A M E !</ModalHeader>
            <ModalBody className="modalBody">
              {this.state.error}
              <img src={sad} alt="" />
            </ModalBody>
            <ModalFooter className="modalFooter">
              <Button id="modalButton" onClick={this.toggle}>
                I apologize and promise to do better
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        <video autoPlay={true} muted={true} loop={true} id="myVideo">
          <source src={video2} type="video/mp4" />
        </video>

        <div className="home-title">
          <Link className="nav-link auth-title" to="/">
            <Title />
          </Link>
        </div>

        <div className="auth-containers">
          <div className="auth-container-right" >

            <h1 id="authHeader1">Sign In</h1>

            <form onSubmit={this.login} >
              <div>Email</div>
              <input
                className="form-control"
                control="input"
                type="text"
                label="Email"
                onChange={e => this.setState({ signin_email: e.target.value })}
                placeholder="email"
                ref="signInEmail"
                value={this.state.signin_email}
                style={{ fontFamily: "Times New Roman" }}
              />
              <div>Password</div>
              <input
                className="form-control"
                control="input"
                type="password"
                label="password"
                onChange={e =>
                  this.setState({ signin_password: e.target.value })
                }
                placeholder="password"
                value={this.state.signin_password}
                style={{ fontFamily: "Times New Roman" }}

              />
              <button
                className="btn btn-sml btn-block"
                id="signin_button"
                type="submit"
                content="Submit"
              //style={{marginTop: "1em"}}
              //onClick={this.login}
              >
                SIGN IN
              </button>
            </form>
          </div>

          <div className="auth-container-right" style={this.state.hideSignIn ? { display: "none" } : { display: "initial" }} >
            <h1 id="authHeader2">Sign Up</h1>
            <form onSubmit={this.signup}>
              <div>Email</div>
              <input
                className="form-control"
                control="input"
                type="text"
                label="Email"
                onChange={e => this.setState({ signup_email: e.target.value })}
                placeholder="email"
                ref="signUpEmail"
                value={this.state.signup_email}
                style={{ fontFamily: "Times New Roman" }}
              />
              <div>Password</div>
              <input
                className="form-control"
                control="input"
                type="password"
                label="password"
                onChange={e =>
                  this.setState({ signup_password: e.target.value })
                }
                placeholder="password"
                value={this.state.signup_password}
                style={{ fontFamily: "Times New Roman" }}
              />
              {/* <div>Profile Photo</div>
              <input
                className="btn btn-sm"
                control="input"
                type="file"
                label="Photo"
                onChange={e => this.setState({ photo: e.target.files[0] })}
                placeholder="Upload photo"
              /> */}
              <button
                className="btn btn-sml btn-block"
                id="signup_button"
                type="submit"
                content="Submit"
                color="purple"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Auth;

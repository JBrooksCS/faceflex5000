import React, { Component } from "react";
import * as firebase from "firebase/app";
import Title from "./Title";
import video from "./particles.mp4";
import { Link } from "react-router-dom";
//import { Header, Form, Grid } from "semantic-ui-react";
import fire from "../config/Fire";
import { saveProfile } from "../API_Manager/profiles";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Fade
} from "reactstrap";
import sad from "./topBar/photos/sad_toby.jpeg"

//import "firebase/auth";
import "../styles/style.css";

class Auth extends Component {
  state = {
    signin_email: "",
    signup_email: "",
    signin_username: "",
    signup_username: "",
    signin_password: "",
    signup_password: "",
    photo: null,
    modal: false,
    error: []
  };
  // For modal
  toggle = () => {
    //console.log("state", this.state);
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  //     this.setState(prevState => ({
  //       signin_email: "",
  //       signup_email: "",
  //       signin_username: "",
  //       signup_username: "",
  //       signin_password: "",
  //       signup_password: "",
  //       photo: null,
  //       modal: !prevState.modal,
  //       error: []
  //     }));
  //   };

  // handleChange = (e) => {
  //     this.setState({ [e.target.name]: e.target.value });
  // }

  closeModal = () => {
    const newState = {
      modal: true,
      error: []
    };
    console.log("EMail Val ", this.refs.signUpEmail.value);
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
        console.log("Made it past Log In, User :", user.uid);
        sessionStorage.setItem("session_id", user.uid);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log("ERROR", error);
        console.log("ERROR", error);
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
    const newState = {
      modal: false,
      error: []
    };
    //console.log(newUser);
    //if (newUser.email && newUser.password) {
    fire
      .auth()
      .createUserWithEmailAndPassword(
        this.state.signup_email,
        this.state.signup_password
      )
      .catch(error => {
        console.log("ERROR", error);
        newState.modal = !this.state.modal;
        newState.error = error.message;
        this.setState(newState);
      });
    //}
    //   .then((_next)=>{
    //       saveProfile(newUser)
    //   })

    //saveProfile(newUser)
  };
  //   authListener = () => {
  //     fire.auth().onAuthStateChanged(function(user) {
  //       if (user) {
  //         console.log("AUTH LISTENER User is signed in.");
  //       } else {
  //         console.log("AUTH LISTENER No user is signed in.");
  //       }
  //     });
  //   };

  testPrint = () => {
    console.log("BUTTON WORKS");
  };

  render() {
    return (
      <>
        {/* <Modal
      isOpen={this.state.modal}
      toggle={this.toggle}
      className={this.props.className}
      onClose={this.closeModal}
      centered={true}
      //fade={true}
    >
      <ModalHeader className="modal-head" >
        Login Error
      </ModalHeader>
      <ModalBody>{this.state.error}</ModalBody>
      <ModalFooter>
        <Button onClick={this.toggle}>
          Got it
        </Button>
      </ModalFooter>
    </Modal> */}
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
              <img src={sad} alt=""/>
            </ModalBody>
            <ModalFooter className="modalFooter">
              <Button id="modalButton" onClick={this.toggle}>
                I apologize and promise to do better
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        <video autoPlay={true} muted={true} loop={true} id="myVideo">
          <source src={video} type="video/mp4" />
        </video>

        <div className="home-title">
          <Link className="nav-link" to="/">
            <Title />
          </Link>
        </div>

        <div className="auth-containers">
          <div className="auth-container-right" >

            <h1 id="authHeader1">Sign In</h1>

            <form onSubmit={this.login} >
              <div>Email</div>
              <input
              className = "form-control"
                control="input"
                type="text"
                label="Email"
                onChange={e => this.setState({ signin_email: e.target.value })}
                placeholder="email"
                ref="signInEmail"
                value={this.state.signin_email}
                style={{fontFamily: "Times New Roman"}}
              />
              <div>Password</div>
              <input
              className = "form-control"
                control="input"
                type="text"
                label="password"
                onChange={e =>
                  this.setState({ signin_password: e.target.value })
                }
                placeholder="Password"
                value={this.state.signin_password}
                style={{fontFamily: "Times New Roman"}}

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

          <div className="auth-container-right">
            <h1 id="authHeader2">Sign Up</h1>
            <form onSubmit={this.signup}>
              <div>Email</div>
              <input
              className = "form-control"
                control="input"
                type="text"
                label="Email"
                onChange={e => this.setState({ signup_email: e.target.value })}
                placeholder="email"
                ref="signUpEmail"
                value={this.state.signup_email}
                style={{fontFamily: "Times New Roman"}}
              />
              <div>Password</div>
              <input
              className = "form-control"
                control="input"
                type="text"
                label="Password"
                onChange={e =>
                  this.setState({ signup_password: e.target.value })
                }
                placeholder="password"
                value={this.state.signup_password}
                style={{fontFamily: "Times New Roman"}}
              />
              <div>Profile Photo</div>
              <input
              className="btn btn-sm"
                control="input"
                type="file"
                label="Photo"
                onChange={e => this.setState({ photo: e.target.files[0] })}
                placeholder="Upload photo"
              />
              <button
              className="btn btn-sml btn-block"
              id="signup_button"
                type="submit"
                content="Submit"
                color="purple"
                //this was giving me problems earlier with () or not
                //onClick={this.signup}
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

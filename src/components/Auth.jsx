import React, { Component } from "react";
//import * as firebase from "firebase/app";
import Title from "./Title";
import video from "./particles.mp4";
import { Link } from "react-router-dom";
import { Header, Form, Grid, Button } from "semantic-ui-react";
import fire from "../config/Fire";
import { saveProfile } from "../API_Manager/profiles";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

//import "firebase/auth";
import "../styles/style.css";

class Auth extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    photo: null,
    modal: false,
    error: []
  };
  // For modal
  toggle = () => {
    console.log("state", this.state);
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  // handleChange = (e) => {
  //     this.setState({ [e.target.name]: e.target.value });
  // }

  closeModal = () => {
    const newState = {
      modal: true,
      error: []
    };
    console.log("EMail Val ",this.refs.signUpEmail.value)
    newState.modal = !this.state.modal;
    this.setState(newState);
  };

  login = e => {
    const newState = {
      modal: true,
      error: []
    };
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push("/home");
      })
      .then(() => {})
      .catch(error => {
        console.log("ERROR", error);
        newState.modal = !this.state.modal;
        newState.error = error.message;
        this.setState(newState);
      });
  };
  signup = e => {
    let newUser = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      photo: this.state.photo
    };
    const newState = {
      modal: false,
      error: []
    };
    console.log(newUser);
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(r => {
        console.log("Response: ", r);
      })
      .catch(error => {
        console.log("ERROR", error);
        console.log("ERROR Status ", error.status);
        newState.modal = !this.state.modal;
        newState.error = error.message;
        this.setState(newState);
      })
    //   .then((_next)=>{
    //       saveProfile(newUser)
    //   })

    //saveProfile(newUser)
  };

  render() {
    return (
      <>
        <video autoPlay={true} muted={true} loop={true} id="myVideo">
          <source src={video} type="video/mp4" />
        </video>
        <div className="home-title">
          <Link className="nav-link" to="/game">
            <Title />
          </Link>
        </div>

        <div className="home-containers">
          <div className="home-container-left">
            <h3>Sign In</h3>
          </div>

          <div className="home-container-right">
            <h3>Sign Up</h3>
            <Form onSubmit={this.saveProfile}>
              <div>Email</div>
              <input
                control="input"
                type="text"
                label="Email"
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="you@email.com"
                ref="signUpEmail"
              />
              <div>Username</div>
              <input
                control="input"
                type="text"
                label="Username"
                onChange={e => this.setState({ username: e.target.value })}
                placeholder="Username"
              />
              <div>Password</div>
              <input
                control="input"
                type="text"
                label="Password"
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Password"
              />
              <div>Profile Photo</div>
              <input
                control="input"
                type="file"
                label="Photo"
                onChange={e => this.setState({ photo: e.target.files[0] })}
                placeholder="Upload photo"
              />
              <button
                type="submit"
                content="Submit"
                color="purple"
                onClick={() => this.signup()}
              >
                SUBMIT
              </button>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className=""
                onClose={this.closeModal}
                centered={false}
              >
                <ModalHeader className="modal-head" toggle={this.toggle}>
                  Login Error
                </ModalHeader>
                <ModalBody>{this.state.error}</ModalBody>
              </Modal>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

export default Auth;

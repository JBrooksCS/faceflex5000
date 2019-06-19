import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles/style.css";
import * as firebase from "firebase/app";

// Your web app's Firebase configuration




ReactDOM.render(
  <Router>
    <App />
  </Router>,

  document.getElementById("root")
);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

class Leaderboard extends Component {
  state = {
    leaders: []
  };

  componentDidMount() {}

  render() {
    return (
      <>
      <h5 className="hallOfFame">HALL OF FAME</h5>
        <div className="nameCardHeader">
          <div className="nameHeader">NAME</div>
          <div className="numFacesHeader">#FACES</div>
          <div className="quoteHeader">QUOTE</div>
        </div>
        <div className="nameCard">
          <div className="name">John</div>
          <div className="numFaces">{"45"}</div>
          <div className="quote">{"Cant stop me"}</div>
        </div>
      </>
    );
  }
}

export default Leaderboard;

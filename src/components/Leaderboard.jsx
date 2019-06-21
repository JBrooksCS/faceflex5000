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
      <div className="HOF_entries">
        <div className="nameCardHeader">
          <div className="nameHeader">NAME</div>
          <div className="numFacesHeader">#FACES</div>
          <div className="quoteHeader">QUOTE</div>
        </div>
        <div className="nameCard">
          <div className="name">Arya</div>
          <div className="numFaces">{"45"}</div>
          <div className="quote">{"Many Face God"}</div>
        </div>
        <div className="nameCard">
          <div className="name">Jon</div>
          <div className="numFaces">{"40"}</div>
          <div className="quote">{"King of north"}</div>
        </div>
        <div className="nameCard">
          <div className="name">Bran</div>
          <div className="numFaces">{"38"}</div>
          <div className="quote">{"3-Eyed Raven"}</div>
        </div>
        <div className="nameCard">
          <div className="name">Ned</div>
          <div className="numFaces">{"35"}</div>
          <div className="quote">{"Wintrs coming"}</div>
        </div>
        <div className="nameCard">
          <div className="name">Sir Davos</div>
          <div className="numFaces">{"34"}</div>
          <div className="quote">{"Onion Knight"}</div>
        </div>
        <div className="nameCard">
          <div className="name">Sansa</div>
          <div className="numFaces">{"29"}</div>
          <div className="quote">{"Ldy Wintrfell"}</div>
        </div>
        <div className="nameCard">
          <div className="name">Jason</div>
          <div className="numFaces">{"29"}</div>
          <div className="quote">{"Siiiiiiiiiiiiiiiiiiiiiiiiick"}</div>
        </div>
        </div>
      </>
    );
  }
}

export default Leaderboard;

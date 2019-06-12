import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

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
        <h1 className="home-title">FACE-FLEX 5000</h1>
        <div className="home-container">
          <div>
            <Link className="nav-link" to="/game">
              PLAY THE GAME
            </Link>
          </div>

          <div>
            <Link className="nav-link" to="/">
              SIGN IN / UP (So you can be on the LEADERBOARD!)
            </Link>
          </div>

          <div>
            <Link className="nav-link" to="/">
              CONTRIBUTE YOUR FACE
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Home;

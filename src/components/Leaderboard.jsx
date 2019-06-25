import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import { getLeaderboard } from "../API_Manager/leaderboard"

class Leaderboard extends Component {
  state = {
    leaders: [], 
    listLength: 5
  };

  componentDidMount() {
    getLeaderboard().then(r => {

      console.log("SCORES", r)

      let sorted = r.sort((a, b) => b.score - a.score)

      this.setState({ leaders: sorted })

      
      // console.log("LEADERS", this.state.leaders)
      console.log("Sorted", sorted)



    })

  }

  render() {


    return (
      <>
        <div className="flex-grid">
          <div className="col nameHeader">NAME
          {(this.state.leaders) ? (
            this.state.leaders.slice(0,5).map((value, index) => {
              return <p key={index} className="name">{value.name}</p>
            })

          ) : ("")}
          </div>
          <div className="col scoreHeader">SCORE
          {(this.state.leaders) ? (
            this.state.leaders.slice(0,5).map((value, index) => {
              return <p key={index} className="score">{value.score}</p>
            })

          ) : ("")}
          </div>
        </div>
      </>
    );
  }
}

export default Leaderboard;

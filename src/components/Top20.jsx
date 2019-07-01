import React, { Component } from "react";
import "../styles/style.css";
import { getLeaderboard } from "../API_Manager/leaderboard"
import video2 from "./FACEFLEX_BG.mp4";



class Top20 extends Component {
    state = {
        leaders: [],
        listLength: 20
    };

    componentDidMount() {
        getLeaderboard().then(r => {
            let sorted = r.sort((a, b) => b.score - a.score)
            this.setState({ leaders: sorted })
        })

    }
    goHome =()=>{
        this.props.history.push("/")
    }




    render() {
        return (
            <>
            <div className="videoContainer" >
        <video autoPlay={true} muted={true} loop={true} id="myVideo">
          <source src={video2} type="video/mp4" />
        </video>
        </div>
            <div className="top20">
            <div className="flex-grid">
          <div className="col nameHeader">NAME
          {(this.state.leaders) ? (
            this.state.leaders.slice(0,20).map((value, index) => {
              return <p key={index} className="name">{value.name}</p>
            })

          ) : ("")}
          </div>
          <div className="col scoreHeader">SCORE
          {(this.state.leaders) ? (
            this.state.leaders.slice(0,20).map((value, index) => {
              return <p key={index} className="score">{value.score}</p>
            })

          ) : ("")}
          </div>
        </div>
        </div>
        <div className="row footer">
          <button className="goHome" onClick={this.goHome}>
            Home
          </button>
          
        </div>

            </>
        );
    }
}

export default Top20;
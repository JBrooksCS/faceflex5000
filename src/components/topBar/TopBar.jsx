import React, { Component } from "react";
import happy from "./photos/smiling_goldblum.png";
import disgust from "./photos/disgusted_wiig.png";
import sad from "./photos/sad_toby.jpeg";
import shocked from "./photos/shocked_cage.png";
import angry from "./photos/angry_cage.jpg";
import scared from "./photos/osmond_scared.jpeg";
import TopImage from "../TopImage"

class TopBar extends Component {
  render() {
      console.log("TopBar Rendering")
    return (
        <>
      <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: ".5px",
        padding: "5px",
      }}>
          <TopImage completed={"none"} expression={happy}/>
          <TopImage completed={"none"} expression={disgust}/>
          <TopImage completed={"none"} expression={sad}/>
          <TopImage completed={"none"} expression={shocked}/>
          <TopImage completed={"none"} expression={angry}/>
          <TopImage completed={"none"} expression={scared}/>

      </div>
      </>
    );
  }
}

export default TopBar;

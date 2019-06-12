import React, { Component } from "react";
import happy from "./photos/smiling_goldblum.png";
import disgust from "./photos/disgusted_wiig.png";
import sad from "./photos/sad_toby.jpeg";
import shocked from "./photos/shocked_cage.png";
import angry from "./photos/angry_cage.jpg";
import scared from "./photos/osmond_scared.jpeg";
import TopImage from "../TopImage"
import TopLabel from "./TopLabel";


class TopBar extends Component {
  render() {
      console.log("TopBar Rendering")
    return (
        <>
      <div
      style={{display: "flex",flexDirection: "row",justifyContent: "space-around", marginTop: ".5px", padding: "5px"}}>
          <div style={{display: "flex", flexDirection: "column", backgroundColor: "", padding: 0}}>
          <TopImage completed={"initial"} highlighted={"true"} expression={happy}/>
          <TopLabel completed={"initial"} />
          </div>
          <div style={{display: "flex", flexDirection: "column", backgroundColor: "green", padding: 5}}>
          <TopImage completed={"none"} highlighted={"false"} expression={disgust}/>
          <TopLabel completed={"hidden"} />
          </div>
          <div style={{display: "flex", flexDirection: "column"}}>
          <TopImage completed={"none"} highlighted={"false"} expression={sad}/>
          <TopLabel completed={"hidden"} />
          </div>
          <div style={{display: "flex", flexDirection: "column"}}>
          <TopImage completed={"none"} highlighted={"false"} expression={shocked}/>
          <TopLabel completed={"hidden"} />
          </div>
          <div style={{display: "flex", flexDirection: "column"}}>
          <TopImage completed={"none"} highlighted={"false"} expression={angry}/>
          <TopLabel completed={"hidden"} />
          </div>
          <div style={{display: "flex", flexDirection: "column"}}>
          <TopImage completed={"none"} highlighted={"false"} expression={scared}/>
          <TopLabel completed={"hidden"} />
          </div>
      </div>
      </>
    );
  }
}

export default TopBar;

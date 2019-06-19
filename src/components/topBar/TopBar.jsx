import React, { Component } from "react";
import happy from "./photos/smiling_goldblum.png";
import disgust from "./photos/disgusted_wiig.png";
import sad from "./photos/sad_toby.jpeg";
import surprised from "./photos/shocked_cage.png";
import angry from "./photos/angry_cage.jpg";
import fearful from "./photos/osmond_scared.jpeg";
import TopImage from "../TopImage"
import TopLabel from "./TopLabel";
 

class TopBar extends Component {

  checkIfCompleted=(component_position , curr_pos)=>{
    if (component_position < curr_pos){ return ("initial") }
    else { return ("hidden") }
  }
  checkIfHighlighted=(component_position , curr_pos)=>{
    if (component_position === curr_pos){ return ("highlighted")}
    else {return ("notHighlighted")}
  }




  render() {
      //console.log("TopBar Rendering")
    return (
        <>
      <div className="topBar" >
          <div className={this.checkIfHighlighted(0, this.props.current_position)}>
          <TopImage expression={happy} isHighlighted={ (this.props.current_position===0) ? true : false }/>
          <TopLabel completed={this.checkIfCompleted(0, this.props.current_position)} />
          </div>

          <div className={this.checkIfHighlighted(1, this.props.current_position)}>
          <TopImage expression={sad} isHighlighted={ (this.props.current_position===1) ? true : false }/>
          <TopLabel completed={this.checkIfCompleted(1, this.props.current_position)} />
          </div>

          <div className={this.checkIfHighlighted(2, this.props.current_position)}>
          <TopImage expression={surprised} isHighlighted={ (this.props.current_position===2) ? true : false }/>
          <TopLabel completed={this.checkIfCompleted(2, this.props.current_position)} />
          </div>

          <div className={this.checkIfHighlighted(3, this.props.current_position)}>
          <TopImage expression={angry} isHighlighted={ (this.props.current_position===3) ? true : false }/>
          <TopLabel completed={this.checkIfCompleted(3, this.props.current_position)} />
          </div>

          <div className={this.checkIfHighlighted(4, this.props.current_position)}>
          <TopImage expression={disgust} isHighlighted={ (this.props.current_position===4) ? true : false }/>
          <TopLabel completed={this.checkIfCompleted(4, this.props.current_position)} />
          </div>

          <div className={this.checkIfHighlighted(5, this.props.current_position)}>
          <TopImage expression={fearful} isHighlighted={ (this.props.current_position===5) ? true : false }/>
          <TopLabel completed={this.checkIfCompleted(5, this.props.current_position)} />
          </div>
      </div>
      </>
    );
  }
}

export default TopBar;

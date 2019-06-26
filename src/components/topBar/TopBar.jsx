import React, { Component } from "react";
// import happy from "./photos/smiling_goldblum.png";
// import disgust from "./photos/disgusted_wiig.png";
// import sad from "./photos/sad_toby.jpeg";
// import surprised from "./photos/shocked_cage.png";
// import angry from "./photos/angry_cage.jpg";
// import fearful from "./photos/osmond_scared.jpeg";
import TopImage from "../TopImage"
// import TopLabel from "./TopLabel";
import "../../styles/shake.css"

//import ALL_IMAGES from "./ALL_IMAGES"
  

class TopBar extends Component {

  state ={
    
  }

  

  getPictures(index){
    let pic = this.props.round[index].image //ALL_IMAGES[0].image
    //console.log(this.props.round.length)
    return pic
  }
  getColor = () =>{
    let expression = this.props.round[this.props.current_position].exp
    console.log("EXP TO MAKE", expression)
    let exp_color = ""
    switch(expression) {
      case "angry":
        exp_color = "red"
        break;
      case "disgusted":
        exp_color = "green"
        break;
      case "fearful":
        exp_color = "purple"
        break;
      case "happy":
        exp_color = "lightblue"
        break;
      // case "neutral":
      //   exp_color = ""
      //   break;
      case "sad":
        exp_color = "blue"
        break;
      case "surprised":
        exp_color = "yellow"
        break;
      default:

    }
    return exp_color
  }
  render() {
      //console.log("TopBar Rendering")
      //console.log("CURR POS ", this.props.current_position)
      let LENGTH = this.props.round.length
      let TWO_BEFORE = (((this.props.current_position-2)+LENGTH)%LENGTH)
      let ONE_BEFORE = (((this.props.current_position-1)+LENGTH)%LENGTH)
      let ONE_AFTER = ((1 + this.props.current_position) % LENGTH)
      let TWO_AFTER = ((2 + this.props.current_position) % LENGTH)
      // console.log( "ANSER", (((this.props.current_position - 1) + LENGTH ) % LENGTH ) )
      // console.log ("TWO BEFORE ", TWO_BEFORE, "ONE BEFORE" , ONE_BEFORE)
      // console.log ("TWO AFTER ", TWO_AFTER, "ONE AFTER" , ONE_AFTER)
    return (
        <>
        {(this.props.round.length > 0)?(
      <div className="topBar">
        <div >
          <TopImage pictureSrc={this.getPictures(TWO_BEFORE)} isHighlighted={ false }/>
          </div>
        <div >
          <TopImage pictureSrc={this.getPictures(ONE_BEFORE)} isHighlighted={ false }/>
          </div>
      <div className="highlighted" style={{ background: this.getColor()}} >
          <TopImage pictureSrc={this.getPictures((this.props.current_position % LENGTH))} isHighlighted={ true }/>
          </div>
      <div >
          <TopImage pictureSrc={this.getPictures(ONE_AFTER)} isHighlighted={false}/>
          </div>
      <div >
          <TopImage pictureSrc={this.getPictures(TWO_AFTER)} isHighlighted={false}/>
          </div>
      </div>
        ) : (<></>)}

      
      </>
    );
  }
}

export default TopBar;



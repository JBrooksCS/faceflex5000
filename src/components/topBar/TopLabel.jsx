import React, { Component } from "react";
import Checkmark from "./photos/checkmark.png"
import "../../styles/shake.css"


class TopLabel extends Component {


  getColor = () => {
    let expression = this.props.round[this.props.current_position].exp
    console.log("EXP TO MAKE", expression)
    let exp_color = ""
    switch (expression) {
      case "angry":
        exp_color = "yellow"
        break;
      case "disgusted":
        exp_color = "orange"
        break;
      case "fearful":
        exp_color = "lightblue"
        break;
      case "happy":
        exp_color = "red"
        break;
      // case "neutral":
      //   exp_color = ""
      //   break;
      case "sad":
        exp_color = "orange"
        break;
      case "surprised":
        exp_color = "blue"
        break;
      default:

    }
    return exp_color
  }



  render() {



    return (
      <>
        {(this.props.round.length > 0 && this.props.color) ?
          <div style={{ position: "relative", display: "flex", alignContent: "center", paddingTop: "1em" }} className="shake-slow shake-constant" >
            <h6


              style={{
                textAlign: "center",
                zIndex: 1,
                position: "absolute",

                color: "orange",
                fontSize: "3em"

              }}
            > Flex </h6>
            <h6
              style={{
                textAlign: "center",
                zIndex: 1,
                position: "absolute",
                paddingTop:"1em",
                color: this.props.color,
                fontSize: "4em"

              }}
            > {(this.props.round[this.props.current_position].exp).toUpperCase()}!! </h6>
          </div>
          :
          <></>}
      </>
    );
  }
}

export default TopLabel;

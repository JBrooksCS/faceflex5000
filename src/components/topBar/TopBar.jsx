import React, { Component } from "react";
// import happy from "./photos/smiling_goldblum.png";
// import disgust from "./photos/disgusted_wiig.png";
// import sad from "./photos/sad_toby.jpeg";
// import surprised from "./photos/shocked_cage.png";
// import angry from "./photos/angry_cage.jpg";
// import fearful from "./photos/osmond_scared.jpeg";
import TopImage from "../TopImage"
import TopLabel from "./TopLabel";
import "../../styles/shake.css"

//import ALL_IMAGES from "./ALL_IMAGES"
  

class TopBar extends Component {

  state ={
    
  }

  checkIfCompleted=(component_position , curr_pos)=>{
    if (component_position < curr_pos){ return ("initial") }
    else { return ("hidden") }
  }
  checkIfHighlighted=(component_position , curr_pos)=>{
    if (component_position === curr_pos){ return ("highlighted")}
    else {return ("notHighlighted")}
  }

  getPictures(index){
    let pic = this.props.round[index].image //ALL_IMAGES[0].image
    //console.log(this.props.round.length)
    return pic
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
      console.log ("TWO BEFORE ", TWO_BEFORE, "ONE BEFORE" , ONE_BEFORE)
      console.log ("TWO AFTER ", TWO_AFTER, "ONE AFTER" , ONE_AFTER)


    return (
        <>
        {(this.props.round.length > 0)?(
      <div className="topBar">
        <div >
          <TopImage pictureSrc={this.getPictures(TWO_BEFORE)} isHighlighted={ false }/>
          {/* <TopLabel completed={this.checkIfCompleted(TWO_BEFORE, this.props.current_position)} /> */}
          </div>
        <div >
          <TopImage pictureSrc={this.getPictures(ONE_BEFORE)} isHighlighted={ false }/>
          {/* <TopLabel completed={this.checkIfCompleted(ONE_BEFORE, this.props.current_position)} /> */}
          </div>
      <div className="highlighted">
          <TopImage pictureSrc={this.getPictures((this.props.current_position % LENGTH))} isHighlighted={ true }/>
          {/* <TopLabel completed={this.checkIfCompleted(this.props.current_position, this.props.current_position)} /> */}
          </div>
      <div >
          <TopImage pictureSrc={this.getPictures(ONE_AFTER)} isHighlighted={false}/>
          {/* <TopLabel completed={this.checkIfCompleted(ONE_AFTER, this.props.current_position)} /> */}
          </div>
      <div >
          <TopImage pictureSrc={this.getPictures(TWO_AFTER)} isHighlighted={false}/>
          {/* <TopLabel completed={this.checkIfCompleted(TWO_AFTER, this.props.current_position)} /> */}
          </div>
      </div>
        ) : (<></>)}

      
      </>
    );
  }
}

export default TopBar;

{/* /* <div className="topBar" >
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
      </div> */ }

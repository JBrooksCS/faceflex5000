import * as firebase from "firebase/app";
import {base} from "../config/Fire"
import {db} from "../config/Fire"


// const url = "http://localhost:8088/leaderboard";
const url = "https://faceflex-api.herokuapp.com/leaderboard";

export const getLeaderboard = () =>{
 return base.fetch('leaderboard',  {
    // context: this,
    //asArray: true
  }
  ).catch(err => {
    // handle error
    console.log(err)
  });
}

export const saveScore = scoreOBJ => {
  // firebase.database().ref('leaderboard/' + userId).set(scoreOBJ);
  base.push(`leaderboard/}`, {
    scoreOBJ,
  }).catch(err => {
    // handle error
    console.log(err)
  });
  };


// export const getLeaderboard = () => {
//     return fetch(url).then(res => res.json());
// }

// export const saveScore = scoreOBJ => {
//     return fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(scoreOBJ)
//     });
//   };
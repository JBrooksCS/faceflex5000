import Rebase from 're-base';
import firebase from 'firebase';

const config = {
   apiKey: "AIzaSyCQAyEwBaMOwgVahMmJCkuvrZkI4B_gaKY",
   authDomain: "fecapstone-57515.firebaseapp.com",
   databaseURL: "https://fecapstone-57515.firebaseio.com",
   projectId: "fecapstone-57515",
   storageBucket: "fecapstone-57515.appspot.com",
   messagingSenderId: "932908202274",
   appId: "1:932908202274:web:8e8de238ff8ebbd6"
 };

export const fire = firebase.initializeApp(config);

export var db = firebase.database(fire);
export var base = Rebase.createClass(db);


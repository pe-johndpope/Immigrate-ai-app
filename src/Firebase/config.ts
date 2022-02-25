import firebase from 'firebase/app';
import 'firebase/auth';
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBdpRt01Zww84Ofo0_bn0bMvmoOTyLUym8",
  authDomain: "immigrate-540ad.firebaseapp.com",
  projectId: "immigrate-540ad",
  storageBucket: "immigrate-540ad.appspot.com",
  messagingSenderId: "515786859241",
  appId: "1:515786859241:web:ed6014d02c73fd324b4678",
  measurementId: "G-G2DY55WJNR"
}; 



let app;
if (firebase.apps.length == 0){
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = firebase.firestore();
const auth = firebase.auth();


export { auth, db }
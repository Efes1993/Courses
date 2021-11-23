import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA7c0NX21zqD1O61Ei5YcuDeQzLGUd026w",
    authDomain: "fir-databasegameproject.firebaseapp.com",
    projectId: "fir-databasegameproject",
    storageBucket: "fir-databasegameproject.appspot.com",
    messagingSenderId: "1057725818563",
    appId: "1:1057725818563:web:9b6e8cfa05f6e8c309a476"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;
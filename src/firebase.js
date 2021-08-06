import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdUgsb7XjqIflDT2EwNqi0Lw8IaizElJc",
    authDomain: "clone-91c17.firebaseapp.com",
    projectId: "clone-91c17",
    storageBucket: "clone-91c17.appspot.com",
    messagingSenderId: "367845173199",
    appId: "1:367845173199:web:14fe190694e8c933d4d4ba",
    measurementId: "G-PSE8282E22"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider };
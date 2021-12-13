import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

export const app = firebase.initializeApp({
    apiKey: "AIzaSyDRt1qJLMjP9b-JhvqZtad5kLHHgy_56aM",
    authDomain: "hunkydorycode.firebaseapp.com",
    projectId: "hunkydorycode",
    storageBucket: "hunkydorycode.appspot.com",
    messagingSenderId: "464041784745",
    appId: "1:464041784745:web:12fff7c6c103a38e1cc0b8",
    measurementId: "G-ZQQFQDBWY4"
});
  
    // Initialize Firebase Auth
    
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

module.exports = {
    app,
    googleAuthProvider,
    facebookAuthProvider,
};

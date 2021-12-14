import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

initializeApp({
    apiKey: "AIzaSyDRt1qJLMjP9b-JhvqZtad5kLHHgy_56aM",
    authDomain: "hunkydorycode.firebaseapp.com",
    projectId: "hunkydorycode",
    storageBucket: "hunkydorycode.appspot.com",
    messagingSenderId: "464041784745",
    appId: "1:464041784745:web:12fff7c6c103a38e1cc0b8",
    measurementId: "G-ZQQFQDBWY4"
});

    // Initialize Firebase Auth
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth();
    
let googleSingInButton = document.querySelector('#googleSingInButton');

googleSingInButton.addEventListener('click', async(e) => {
    e.preventDefault();
    const { _tokenResponse: credentials } = await signInWithPopup(auth, googleAuthProvider);
    // console.log(credentials);
    signIn( credentials );
});

const signIn = ( credentials ) => {
    const body = { id_token: credentials.idToken }
    fetch('http://localhost:3000/api/v1/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then( resp => resp.json() )
    .then( resp => {
        console.log( resp );
        localStorage.setItem( 'email', resp.email);
    })
    .catch( console.warn );
};

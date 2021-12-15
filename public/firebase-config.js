import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

//THIS FILE BELONGS TO FRONTEND


// ######################   INSERT FIREBASE CONFIG HERE   ######################
initializeApp({
    apiKey: "AIzaSyDRt1qJLMjP9b-JhvqZtad5kLHHgy_56aM",
    authDomain: "hunkydorycode.firebaseapp.com",
    projectId: "hunkydorycode",
    storageBucket: "hunkydorycode.appspot.com",
    messagingSenderId: "464041784745",
    appId: "1:464041784745:web:12fff7c6c103a38e1cc0b8",
    measurementId: "G-ZQQFQDBWY4"
});
//  ######################   END FIREBASE CONFIG   #############################


// Initialize Firebase Auth
const auth = getAuth();
    
let signInButtons = document.querySelector('button');
signInButtons.addEventListener('click', ({target}) => {
    const { id } = target;
    switch (id) {
        case 'googleSignInButton':
            startSignIn( new GoogleAuthProvider() );
            break;
    
        default:
            break;
    }
});

const startSignIn = async( provider ) => {
    try {
        const { _tokenResponse: credentials } = await signInWithPopup(auth, provider);
        signIn( credentials );
    } catch (error) {
        console.warn(error);
    }
};

const signIn = async( credentials ) => {
    try {
        const body = { id_token: credentials.idToken };
        const resp = await fetch('http://localhost:3000/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const { token, email } = await resp.json();
        localStorage.setItem( 'email', email);

        console.log({ 
            token,
            email,
        });
    } catch (error) {
        console.warn(error);
    }
};

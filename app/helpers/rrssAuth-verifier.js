'use strict';
const { auth } = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { FIREBASE_APIKEY,
        FIREBASE_AUTHDOMAIN,
        FIREBASE_PROJECTID,
        FIREBASE_STORAGEBUCKET,
        FIREBASE_MESSAGINGSENDERID,
        FIREBASE_APPID,
        FIREBASE_MEASUREMENTID} = process.env;

initializeApp({
    apiKey: FIREBASE_APIKEY,
    authDomain: FIREBASE_AUTHDOMAIN,
    projectId: FIREBASE_PROJECTID,
    storageBucket: FIREBASE_STORAGEBUCKET,
    messagingSenderId: FIREBASE_MESSAGINGSENDERID,
    appId: FIREBASE_APPID,
    measurementId: FIREBASE_MEASUREMENTID
})

async function rrssAuthVerify( token = ''){
    const { name, picture, email } = await auth().verifyIdToken( token ); //tiene rest
    return { 
        name,
        image: picture,
        email };
}

module.exports = {
    rrssAuthVerify,
}
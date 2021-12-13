'use strict';

const { app } = require("./firebase-config");

export const startSocialAuth = async( provider ) => {
    const userCredential = await app.auth().signInWithPopup(provider);

    console.log(userCredential);
    console.log('hola')
}

module.exports = {
    startSocialAuth
}
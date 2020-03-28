// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDcMK1JyOTLCS0vBFv6ic3n6Bryoho9Btk",
    authDomain: "atietam-15d7f.firebaseapp.com",
    databaseURL: "https://atietam-15d7f.firebaseio.com",
    projectId: "atietam-15d7f",
    storageBucket: "atietam-15d7f.appspot.com",
    messagingSenderId: "279066391681",
    appId: "1:279066391681:web:754fdc908d8d420c620980"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//Cloud FIRESTORE
const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

let secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");


export {
    db,
    auth,
    functions
}
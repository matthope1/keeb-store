// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const config = {
	apiKey: "AIzaSyArVo9OLXwaGHvGmxGCMP-7nT6DiBBaX5k",
    authDomain: "keeb-store.firebaseapp.com",
    databaseURL: "https://keeb-store.firebaseio.com",
    projectId: "keeb-store",
    storageBucket: "keeb-store.appspot.com",
    messagingSenderId: "560632301677",
    appId: "1:560632301677:web:5f678f2f834f974e1d5764"	
};
firebase.initializeApp(config);

// this exports the CONFIGURED version of firebase
export default firebase;
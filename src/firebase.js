// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const config = {
	apiKey: "YOUR-API-KET",
	authDomain: "bookshelf-8d68a.firebaseapp.com",
	databaseURL: "https://bookshelf-8d68a.firebaseio.com",
	projectId: "bookshelf-8d68a",
	storageBucket: "bookshelf-8d68a.appspot.com",
	messagingSenderId: "548100999451"
};
firebase.initializeApp(config);

// this exports the CONFIGURED version of firebase
export default firebase;
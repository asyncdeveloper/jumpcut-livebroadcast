import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const fbConfig = {
    apiKey: "AIzaSyCNksFsRI8aqs7xfhwq3Te5VysHBYEAvws",
    authDomain: "jumpcut-livebroadcast.firebaseapp.com",
    databaseURL: "https://jumpcut-livebroadcast.firebaseio.com",
    projectId: "jumpcut-livebroadcast",
    storageBucket: "jumpcut-livebroadcast.appspot.com",
    messagingSenderId: "83682817718",
    appId: "1:83682817718:web:7a3eaba5d5e03708"
};
// Initialize Firebase
firebase.initializeApp(fbConfig);

export default firebase;
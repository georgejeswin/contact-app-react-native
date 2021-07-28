import * as firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCd8UppaA3mTgw1mTgKd-B83x4RmeTDhj0",
  authDomain: "contactapp-a721c.firebaseapp.com",
  projectId: "contactapp-a721c",
  storageBucket: "contactapp-a721c.appspot.com",
  messagingSenderId: "990979025491",
  appId: "1:990979025491:web:7059d801b991dcd98d34a6",
  measurementId: "G-JDTDMSNY05",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// export const firestore = firebaseApp.firestore();
// export const auth = firebaseApp.auth();

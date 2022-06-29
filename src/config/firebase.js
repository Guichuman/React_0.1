// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWRo17A2vR2kkb8anVh-pAfLUwRcr2dZ4",
  authDomain: "mindbooster-3bb53.firebaseapp.com",
  projectId: "mindbooster-3bb53",
  storageBucket: "mindbooster-3bb53.appspot.com",
  messagingSenderId: "352398484282",
  appId: "1:352398484282:web:143ac9fc17475596cbe603",
  measurementId: "G-KX9GRL4HCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;
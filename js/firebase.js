import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import {
  getFirestore, // Correct import for Firestore
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// firebaseConfig

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1WB078B_6H91wSSGJLW8qml6QBpFhOjg",
  authDomain: "challengers-8bb97.firebaseapp.com",
  projectId: "challengers-8bb97",
  storageBucket: "challengers-8bb97.firebasestorage.app",
  messagingSenderId: "1085851282900",
  appId: "1:1085851282900:web:5e7e5a72815d6bf3c7fa41",
  measurementId: "G-46QQRVB66H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

export const auth = getAuth();

export default app;

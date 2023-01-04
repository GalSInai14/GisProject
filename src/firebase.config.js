// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA94ORX3xKRpoSHHCYwH4PjCIIVj2cq88",
  authDomain: "englandstadiums.firebaseapp.com",
  projectId: "englandstadiums",
  storageBucket: "englandstadiums.appspot.com",
  messagingSenderId: "1011076500848",
  appId: "1:1011076500848:web:b9daf629836c42a941d3b5",
  measurementId: "G-GDFYPQG2XX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);

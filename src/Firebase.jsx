// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmD6-VsZyFkxOGdJJ0rCWjmaP1tLZv80E",
  authDomain: "dev-food-fed71.firebaseapp.com",
  projectId: "dev-food-fed71",
  storageBucket: "dev-food-fed71.firebasestorage.app",
  messagingSenderId: "515674531546",
  appId: "1:515674531546:web:e921e72eb30eae5733e7e3",
  measurementId: "G-ELBV2KMPSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 
 export const auth = getAuth();
const analytics = getAnalytics(app);
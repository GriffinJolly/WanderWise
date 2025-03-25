// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4BJO6WlAewnq2edurusI78pm6ORNUnE8",
  authDomain: "wanderwise-18978.firebaseapp.com",
  projectId: "wanderwise-18978",
  storageBucket: "wanderwise-18978.firebasestorage.app",
  messagingSenderId: "459929904760",
  appId: "1:459929904760:web:fbe7e8469cf71c80fd6f8d",
  measurementId: "G-51CY5EK635"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
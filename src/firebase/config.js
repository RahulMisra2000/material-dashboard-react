// Firebase configuration file
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyCequ8iL2G8__7T9WSgIqY7lnw7x3S2_Fk",
  authDomain: "first-firebase-project-16d9e.firebaseapp.com",
  projectId: "first-firebase-project-16d9e",
  storageBucket: "first-firebase-project-16d9e.firebasestorage.app",
  messagingSenderId: "1015776765701",
  appId: "1:1015776765701:web:d5d751db11e9de7cff796c",
  measurementId: "G-1X1RBN3ZLL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//  ************************************************************* EXPORTS auth, googleProvider and db
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { db };

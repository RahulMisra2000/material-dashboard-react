// Firebase configuration file
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { connectFirestoreEmulator } from "firebase/firestore";

// Your Firebase config from the Firebase console
const firebaseConfig = {
  /* OLD
  apiKey: "AIzaSyCequ8iL2G8__7T9WSgIqY7lnw7x3S2_Fk",
  authDomain: "first-firebase-project-16d9e.firebaseapp.com",
  projectId: "first-firebase-project-16d9e",
  storageBucket: "first-firebase-project-16d9e.firebasestorage.app",
  messagingSenderId: "1015776765701",
  appId: "1:1015776765701:web:d5d751db11e9de7cff796c",
  measurementId: "G-1X1RBN3ZLL",
  */
  apiKey: "AIzaSyD3DWCblJieLVkRVUOWYU7lYomkvjr2Qpg",
  authDomain: "fir-proj-clearinsight.firebaseapp.com",
  projectId: "fir-proj-clearinsight",
  storageBucket: "fir-proj-clearinsight.firebasestorage.app",
  messagingSenderId: "645598033944",
  appId: "1:645598033944:web:9d15467cca4269a5aceb6d",
  measurementId: "G-0LL9XNWLT2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//  ********** If you want to use the LOCAL firestore emulator and not the one by Google in the cloud then uncomment the next line ***************** */
//  ********** Make sure you run the emulator before running the react app. How to do it is in package.json **************************************** */
//  ********** The emulator UI is at http://localhost:4000 ***************************************************************************************** */
// connectFirestoreEmulator(db, "localhost", 8080);

// If you are using the service account on a node server app then you will need to do this process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { db };

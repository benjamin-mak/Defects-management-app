import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOSdFfxqi8gpqi_WY5Qp8GOx1keZsZd0Q",
  authDomain: "ga-project1-4755b.firebaseapp.com",
  projectId: "ga-project1-4755b",
  storageBucket: "ga-project1-4755b.appspot.com",
  messagingSenderId: "242311190800",
  appId: "1:242311190800:web:5964d422f791d7a18b2d95",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialise authentication
const auth = getAuth(app);

// Initialise database
const db = getFirestore(app);

export default db;

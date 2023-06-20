// import { userSignUp } from "../data-storage-js/firebase-info.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
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

// Get the signup details from the user input
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");

// function that creates a new user in firebase
const userSignUp = async () => {
  const signUpEmail = userEmail.value;
  const signUpPassword = userPassword.value;
  createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
      alert("Your account has been created");
      // Redirect to login page
    })
    .catch((error) => {
      const errorCode = error.errorCode;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
};

// Sign up button - on click saves the user details to the database
const signUpBtn = document.querySelector("#signup-btn");
signUpBtn.addEventListener("click", userSignUp);

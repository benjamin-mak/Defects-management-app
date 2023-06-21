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

// Function that shows an error on the signup page
const signupError = () => {
  let div = document.querySelector("#signup-error");
  div.textContent = "";
  setTimeout(() => {
    div.textContent = "Email/password already exists. Try again.";
  }, 300);
};

// function that creates a new user in firebase
const userSignUp = async (event) => {
  const signUpEmail = signupEmailInput.value;
  const signUpPassword = signupPasswordInput.value;
  createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
      alert("Your account has been created");
      // Redirect to login page
      window.location.assign("/Defects-management-app/login.html");
    })
    .catch((error) => {
      const errorCode = error.errorCode;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      signupError();
    });
};

// Sign up button - on click saves the user details to the database
const signUpBtn = document.querySelector("#signup-btn");
signUpBtn.addEventListener("click", userSignUp);

// Get the signup details from the user input
const signupEmailInput = document.querySelector("#signup-email");
const signupPasswordInput = document.querySelector("#signup-password");

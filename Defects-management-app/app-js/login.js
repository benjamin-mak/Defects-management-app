import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
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

// Event handlers object //
const eventHandlers = {
  // Redirects to the home dashboard page
  dashboardHome: (event) => {
    event.target.parentNode.href = "dashboard-html/dashboard.html";
  },
};

/**** Functions *****/
// Function that shows an error on the login page if the user credentials are wrong
const loginError = () => {
  let div = document.querySelector("#login-error");
  div.textContent = "";
  setTimeout(() => {
    div.textContent = "Wrong email/password. Try again.";
  }, 300);
};

// Function that validates user details and signs into firebase
const userLogin = async () => {
  const loginEmail = userEmail.value;
  const loginPassword = userPassword.value;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    alert("Login success");
    // Redirect to dashboard home page
    // window.location.assign(
    //   "/Defects-management-app/dashboard-html/dashboard.html"
    // );
    // console.log(userCredential.user);
  } catch (error) {
    const errorCode = error.errorCode;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
    // Show error message on the page
    loginError();
  }
  checkAuthState();
};

// Function that checks the current authentication state
export const checkAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    // If user is signed into firebase, redirect to dashboard home
    if (user) {
      window.location.assign(
        "/Defects-management-app/dashboard-html/dashboard.html"
      );
    } else {
      // if not, redirect to login page
      window.location.assign("/Defects-management-app/login.html");
    }
  });
};

// Function that signs the user out of firebase
export const userLogout = async () => {
  try {
    await signOut(auth);
    alert("You have signed out successfully.");
  } catch (error) {
    const errorCode = error.errorCode;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
    alert("Unable to sign out.");
  }
};

// Buttons //
// Login button - on click, validates user credentials
document.querySelector("#login-btn").addEventListener("click", (e) => {
  e.preventDefault();
  userLogin();
});

// Get login details from user input
const userEmail = document.querySelector("#login-email");
const userPassword = document.querySelector("#login-password");

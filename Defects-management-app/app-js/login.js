import { userLogin, checkAuthState } from "./functions.js";

// Get login details from user input
let userEmail = document.querySelector("#login-email");
let userPassword = document.querySelector("#login-password");

// Buttons //
// Login button - on click, validates user credentials
document.querySelector("#login-btn").addEventListener("click", (e) => {
  e.preventDefault();
  userLogin(userEmail, userPassword);
});

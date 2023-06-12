// Event handlers object
const eventHandlers = {
  // Logouts and redirects to login page
  logout: (event) => {
    event.target.href = "../login.html";
  },
};

// Add logout event to logout button
document
  .querySelector("#logout-btn")
  .addEventListener("click", eventHandlers.logout);

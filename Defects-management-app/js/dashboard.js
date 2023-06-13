// Event handlers object //
const eventHandlers = {
  // Logouts and redirects to login page
  logout: (event) => {
    event.target.href = "../login.html";
  },

  // Returns to the home dashboard page
  dashboardHome: (event) => {
    event.target.parentNode.href = "dashboard-html/dashboard.html";
  },

  // Opens the create a new project popup
  addProject: () => {
    document.querySelector("#project-name-popup-id").classList.add("active");
    document.querySelector("#overlay").classList.add("active");
  },

  // Closes the create a new project popup
  closeAddProject: () => {
    document.querySelector("#project-name-popup-id").classList.remove("active");
    document.querySelector("#overlay").classList.remove("active");
  },
};

// Buttons //
// Logout button - On click logouts and returns to login page
document
  .querySelector("#logout-btn")
  .addEventListener("click", eventHandlers.logout);

// Home button - On click, returns to home dashboard
document
  .querySelector("#home-btn")
  .addEventListener("click", eventHandlers.dashboardHome);

// Add project button - on click, creates a new project popup
document
  .querySelector("#add-project")
  .addEventListener("click", eventHandlers.addProject);

// Project name popup window close button
document
  .querySelector("#project-name-popup-close-btn")
  .addEventListener("click", eventHandlers.closeAddProject);
